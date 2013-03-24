function makeMarker(title, position, location_id, num_needed, map) {
	var blueCircle = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: num_needed > 5 ? "green" : "red",
		fillOpacity: 0.8,
		scale: 5,
		strokeWeight: 0.5
	}
	var marker = new google.maps.Marker({
		position: position,
		title: title,
		icon: blueCircle,
		map: map
	});
	marker.setValues({location_id: location_id});
	
	google.maps.event.addListener(marker, 'click', function() {
		// todo: enlarge icon if selected
		map.setCenter(marker.getPosition());
		document.forms[0].elements["location_id"].value = marker.get("location_id");
	});
	
	return marker;
}

// Returns an array of LocationIdMarkers.
function loadMarkers(map) {

	// Manhattan
	/*addMarker(map, "Washington Square", new google.maps.LatLng(40.730869, -73.997726));
	addMarker(map, "Bryant Park", new google.maps.LatLng(40.753564, -73.982878));
	addMarker(map, "Union Square", new google.maps.LatLng(40.735551, -73.990345));
	addMarker(map, "Tompkins Square Park", new google.maps.LatLng(40.726576, -73.981848));
	addMarker(map, "Morningside Heights", new google.maps.LatLng(40.806468, -73.958502));
	addMarker(map, "Fort Tryon Park", new google.maps.LatLng(40.862836, -73.931465));
	addMarker(map, "Upper West Side", new google.maps.LatLng(40.785676, -73.970604));
	addMarker(map, "Great Lawn", new google.maps.LatLng(40.781256, -73.966527));
	addMarker(map, "Columbus Circle Area", new google.maps.LatLng(40.768029, -73.981977));
	addMarker(map, "Midtown East", new google.maps.LatLng(40.751386, -73.976011));
	addMarker(map, "Lower Manhattan", new google.maps.LatLng(40.712947, -74.005923));*/
	
	// Getting from some other JS: lat, long, display name, location ID, # people needed.
	// Test data for now.
	var marker_descs = [];
	
	var marker1 = []
	marker1.push("40.73");
	marker1.push("-73.99");
	marker1.push("Washington Square");
	marker1.push("101");
	marker1.push("3");
	marker_descs.push(marker1);
	
	var marker2 = []
	marker2.push("40.75");
	marker2.push("-73.98");
	marker2.push("Bryant Park");
	marker2.push("102");
	marker2.push("10");
	marker_descs.push(marker2);
	
	var markers = []
	for (i in marker_descs) {
		var position = new google.maps.LatLng(eval(marker_descs[i][0]), eval(marker_descs[i][1]));
		var title = marker_descs[i][2];
		var location_id = marker_descs[i][3];
		var num_needed = eval(marker_descs[i][4]);
		markers.push(makeMarker(title, position, location_id, num_needed, map));
	}
	
	return markers;
}

// Runs on window loading.
function initializeMap() {
	var mapOptions = {
		center: new google.maps.LatLng(40.735551, -73.990345),
		zoom: 11,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	var markers = loadMarkers(map);
}