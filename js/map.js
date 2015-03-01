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
	var tmp = {};
	tmp.lat = parseFloat(point.lat);
	tmp.lng=parseFloat(point.lng);
	console.log("tmp",tmp);
	
	var results = new L.LayerGroup().addTo(map);
	  map.setView(tmp, 18);
		
	results.addLayer(L.marker(tmp));
	 
	
}
