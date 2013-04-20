// Check for POST variables and open up the form
// if() {
//   $("#form_times").removeClass("disabled");
//   $('#form_details').removeClass("disabled");
//   $('.btn-group button').each(function() {
//     $(this).removeAttr("disabled");
//   });
// }

var markers = [];
var mapDotScaleSelected = 13;
var mapDotScaleUnselected = 8;
var mapDotScaleHover = 9.5;

// Lower bounds for "full" ratios for locations.
var reallyfull = 1.0;
var full = 0.85;
var middle = 0.1;

// Returns an icon based on volunteer availability. There are 5 time slots, takes the number
// in the least-filled time slot and weights it 50%; the rest are 12.5% each. Color decided
// based on the weighted amount.
function makeIcon(timeMap) {
	var min = 10;
    for (var time in timeMap) {
      if (timeMap[time] < min) min = timeMap[time];
    }

    var ratio = 0;
    for (var time in timeMap) {
      if (timeMap[time] == min) ratio += 0.5*timeMap[time];
      else ratio += 0.125*timeMap[time];
    }

	var strokeWeight;
	var fillColor;
	if (ratio >= reallyfull) {
	  fillColor = "#444444";
	  strokeWeight = 3;
	  strokeColor = "#222222";
	}
	else if (ratio >= full) {
	  fillColor = "#43a8c6";
	  strokeWeight = 3;
	  strokeColor = "#097494";
	}
	else if (ratio >= middle) {
	  fillColor = "#c4c4c4";
	  strokeWeight = 3;
	  strokeColor = "#10a2cd";
	}
	else {
	  fillColor = "#bdbdbd";
	  strokeWeight = 3;
	  strokeColor = "#a7a7a7";
	}
	var icon = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: fillColor,
		fillOpacity: 0.8,
		strokeOpacity: 0.7,
		scale: mapDotScaleUnselected,
		strokeWeight: strokeWeight,
		strokeColor: strokeColor
	}
	return icon;
}

function resetButtons() {
  $('.btn-group button').each(function() {
    $(this).removeClass("active");
    $(this).removeClass("middle");
    $(this).removeClass("full");
    $(this).removeClass("reallyfull");
    $(this).removeAttr("disabled");
  });
}

function makeMarker(title, position, locationId, fractionsFull) {
	var marker = new google.maps.Marker({
		position: position,
		title: title,
		icon: makeIcon(fractionsFull)
	});
	marker.setValues({location_id: locationId, permScale: mapDotScaleUnselected});

	google.maps.event.addListener(marker, 'click', function() {
		$("#form_times").removeClass("disabled");
		$("#member_leader").removeAttr("disabled");
		$('#location_id').val(marker.get("location_id"));
		$('#location_title_hover').hide();
		$('#location_title').replaceWith("<div id='location_title'>Area chosen: " + marker.getTitle() + "</div>");
		var timeMap = spots[marker.get("location_id")];
		// make the selected marker large, all others smaller
		for (i in markers) {
			icon = markers[i].getIcon();
			var scale = markers[i].get("location_id") == marker.get("location_id") ?
				mapDotScaleSelected : mapDotScaleUnselected;
			icon.scale = scale;
			markers[i].set("permScale", scale);
			markers[i].setIcon(icon);
		}

		// update buttons
		resetButtons();
		$('.btn-group button').each(function() {
		  var time = $(this).val();
		  var fraction = timeMap[time];
		  // assign class based on fraction
		  if (fraction >= reallyfull) {
		    $(this).addClass("reallyfull");
		    $(this).attr('title', 'This location is pretty full, but you can sgn up for the waitlist.');
		  }
		  else if (fraction >= full) $(this).addClass("full");
		  else if (fraction >= middle) $(this).addClass("middle");
		  else $(this).addClass("empty");
        });
	});

	// make icon slightly larger on mouseover
	google.maps.event.addListener(marker, 'mouseover', function() {
		icon = marker.getIcon();
		icon.scale = mapDotScaleHover;
		marker.setIcon(icon);
	});

	// return to original size
	google.maps.event.addListener(marker, 'mouseout', function() {
		icon = marker.getIcon();
		icon.scale = marker.get("permScale");
		marker.setIcon(icon);
	});

	// show location title on mouseover
	google.maps.event.addListener(marker, 'mouseover', function() {
		$('#location_title_hover').replaceWith("<div id='location_title_hover'>Click to select: " + marker.getTitle() + "</div>");
		$('#location_title').hide();
		$('#location_title_hover').show();
	});

	// hide location title on mouseout
	google.maps.event.addListener(marker, 'mouseout', function() {
		$('#location_title_hover').hide();
		$('#location_title').show();
	});

	return marker;
}

// Build up array of: locationId -> (time -> % availability).
var spots = {}

// Populates markers array.
function loadMarkers() {
	$.getJSON('/registration/locations.json', function(data) {
	  var places = data['locations']
	  var times = data['times'];
	  for (i in places) {
	    var position = new google.maps.LatLng(places[i]['lat'], places[i]['lng']);
	  	var markerTitle = places[i]['name'];
     	var locationId = places[i]['id'];
		// time_counts is a map from time slot ID to the number we have
		var needPerTimeSlot = places[i]['target_distribution_sites'] * 6;
		var fractionsFull = {}
		for (var time in times) {
		  fractionsFull[time] = places[i]['time_counts'][time]/needPerTimeSlot;
		}
		spots[locationId] = fractionsFull;

		var marker = makeMarker(markerTitle, position, locationId, fractionsFull);
		markers.push(marker);

		if (locationId == INITIAL_LOCATION_ID) {
			google.maps.event.trigger(marker, 'click');
		}
	  }
    });
}

// Runs on window loading. Markers already created, so just assigns the map to them.
function initializeMap() {
	var mapOptions = {
		center: new google.maps.LatLng(40.770662, -73.974037),
		zoom: 11,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false,
		rotateControl: false,
		streetViewControl: false,
		mapTypeControl: false
	};

	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	for (i in markers) {
		markers[i].setMap(map);
	}
}

function validateForm() {
  // check if user entered location
  if ($('#location_id').val() == '') {
    alert('Please specify a location');
    return false;
  }

  return true;
}

function enableDisableFormDetails() {
	if( ($('#times').val()=="1") || ($('#times').val()=="") ) {
		$('#form_details').addClass("disabled");
		$('#form_details :input').attr('disabled', true);
	}
	else {
		$('#form_details').removeClass("disabled");
		$('#form_details :input').removeAttr('disabled');

	}
	return true;
}

function setTimesVal() {
  // iterate through buttons to see which are active
  var times = '';
  if ($('#leader-group').is(':visible')) {
	$('#leader-group').children().each(function() {
	  console.log($(this).val());
	  if ($(this).hasClass('active')) {
		times += $(this).val() + ',';
	  }
	});
  } else {
	$('#worker-group').children().each(function() {
	  console.log($(this).val());
	  if ($(this).hasClass('active')) {
		times += $(this).val() + ',';
	  }
	});
  }
  $('#times').val(times);

  return true;
}

function setUpButtons() {
    $('.btn-group button').click(function(e) {
      $(this).toggleClass('active');
      console.log($(this).attr('class'));
      $('#member_first_name').focus();
	  setTimesVal();
	  enableDisableFormDetails();

    });

    // todo: make the waitlist button "hover"

    // todo: this doesn't work if someone hits "back"
    $('#member_leader').change(function() {
      if (this.checked) {
      	$('#worker-group').hide();
        $('#leader-group').show();
      } else {
        $('#leader-group').hide();
        $('#worker-group').show();
      }
      setTimesVal();
      enableDisableFormDetails();
    });
}