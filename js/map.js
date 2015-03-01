var gun = Gun(location.origin + '/gun');
var expedia = gun.load('primus/expedia');


// function allPoint(){
// 	expedia.map(function(point){
// 		console.log("Here is the data point", point);
// 	})
// }

function mapPoint(point){
	// if already exist then skip
	// else put on map
	console.log('CAN WE DO THIS???', point);
	var location = {};
	location.lat = parseFloat(point.lat);
	location.lng=parseFloat(point.lng);
	console.log("location",location);

	// var mapIcon = 
	// L.icon({
	//  iconUrl: 'images/Map-marker.png',
	//  shadowUrl: 'images/Map-marker.png',
	// 
	//  iconSize: [38, 95], // size of the icon
	//  shadowSize: [50, 64], // size of the shadow
	//  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
	//  shadowAnchor: [4, 62], // the same for the shadow
	//  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
	// });
	var results = new L.LayerGroup().addTo(map);
	  map.setView(location, 18);
	
		console.log(point.hotelURL);
	results.addLayer(L.marker(location).on('click', function(e) {
	 window.location.href = point.hotelURL;
	}));
		
}
