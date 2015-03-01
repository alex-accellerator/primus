// var gun = Gun('http://gunjs.herokuapp.com/gun'); //, location.origin + '/gun']);
var gun = Gun(location.origin + '/gun');
var expedia = gun.load('primus/expedia');


expedia.blank (function () {

	$.get("http://terminal2.expedia.com/suggestions/regions?query=las%20vegas&apikey=Rbc5P7hu4X96LXpe1n1vAnsP4Y7ENq8I",
	function(arraylist){ 

		arraylist.forEach(function(item, index){

			var object = {
				name: item.name,
				id: item.id,
				lat: item.position.coordinates[0],
				long: item.position.coordinates[1]
			};
			expedia.group(object);
			console.log('expedia API', object, index);
		});
	});
}).get (function (data) {
	this.map (function (item) {
		console.log('gun', item)
	});
})