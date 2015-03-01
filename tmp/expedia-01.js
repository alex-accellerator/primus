// var gun = Gun('http://gunjs.herokuapp.com/gun'); //, location.origin + '/gun']);
var gun = Gun(location.origin + '/gun');
var expedia = gun.load('primus/expedia');


		$.get("http://terminal2.expedia.com/suggestions/regions?query=san%20francisco&apikey=Rbc5P7hu4X96LXpe1n1vAnsP4Y7ENq8I", function(regionlist){

		var region = regionlist.sr;
			var object = {
				id: region[0].id
			};
			expedia.group(object);

});

$.get("http://terminal2.expedia.com/hotels?regionids=178305&dates=2015-05-19,2015-05-22&adults=3&childages=6,9&sort=price&maxhotels=10&apikey=Rbc5P7hu4X96LXpe1n1vAnsP4Y7ENq8I", function(hotelresult){
	var hotellist = hotelresult.HotelInfoList;
	var hotelinfo = hotellist.HotelInfo;
//	console.log("hotelresult", hotelresult);
console.log("hotelinfo", hotelinfo);
	
	var hotels = [];
	$(hotelinfo).each (function(index){
		var aHotel = hotelinfo[index]
		var hotel = {
			name: aHotel.Name,
			latitude: aHotel.Location.GeoLocation.Latitude,
			longitude: aHotel.Location.GeoLocation.Longitude,
			totalprice: aHotel.Price.TotalRate.Value,
			hotelicon: aHotel.ThumbnailUrl
			
		};
		
		hotels.push(hotel);
	});

	console.log("hotels", hotels);
});

