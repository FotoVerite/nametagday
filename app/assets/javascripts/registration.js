var markers = [];

// Returns an icon based on volunteer availability. (Right now just takes ratio of total volunteers
// to total needed volunteers across all time slots. Can change to arbitrary whatever.)
function makeIcon(needMap, haveMap) {
	var sumHave = 0;
	var sumNeed = 0;
	for (i in needMap) {
		sumNeed += needMap[i];
	}
	for (i in haveMap) {
		sumHave += haveMap[i];
	}
	
	// fill color depends on the combination of what we have and need at various times
	var ratio = sumHave / sumNeed;
	var fillColor;
	if (ratio == 1) fillColor = "black";
	else if (ratio < 0.3) fillColor = "gray";
	else fillColor = "blue";
	var icon = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: fillColor,
		fillOpacity: 0.8,
		scale: 5,
		strokeWeight: 0.5
	}
	return icon;
}

function makeMarker(title, position, location_id, needMap, haveMap) {
	var icon = makeIcon(needMap, haveMap);
	var marker = new google.maps.Marker({
		position: position,
		title: title,
		icon: makeIcon(needMap, haveMap)
	});
	
	// writes arbitrary values into dict
	marker.setValues({location_id: location_id});
	
	google.maps.event.addListener(marker, 'click', function() {
		$('#location_id').val(marker.get("location_id"));
		
		// make the selected marker large, all others smaller
		for (i in markers) {
			icon = markers[i].getIcon();
			icon.scale = markers[i].get("location_id") == marker.get("location_id") ? 10 : 5;
			markers[i].setIcon(icon);
		}
		
		// todo: update displayed button colors
		
	});
	
	return marker;
}

// Populates markers array.
function loadMarkers() {
	$.getJSON('locations.json', function(data) {
	  var places = data['locations']
	  var times = data['times'];
	  for (i in places) {
	    var position = new google.maps.LatLng(places[i]['lat'], places[i]['lng']);
	  	var markerTitle = places[i]['name'];
     	var location_id = places[i]['id'];
		var need = {};
		var have = places[i]['time_counts'];
		for (var time in times) {
		  need[time] = places[i]['target_distribution_sites'] * 6;
		}
	
		var marker = makeMarker(markerTitle, position, location_id, need, have);
		markers.push(marker);
	  }
    });
}

// Runs on window loading. Markers already created, so just assigns the map to them.
function initializeMap() {
	var mapOptions = {
		center: new google.maps.LatLng(40.735551, -73.990345),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
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
  
  // iterate through buttons to see which are active
  var times = '';
  $('.btn-group button').each(function() {
    if ($(this).hasClass('active')) {
      times += $(this).val() + ',';
    }
  });
  $('#times').val(times);
  
  return true;
}