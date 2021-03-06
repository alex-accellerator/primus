// var gun = Gun('http://gunjs.herokuapp.com/gun'); //, location.origin + '/gun']);

function expediaSearch(primusSearch)
{
	
var gun = Gun(location.origin + '/gun');
var expedia = gun.load('primus/expedia');

var hotelIds = [];

var searchString = primusSearch;


$.get("http://terminal2.expedia.com/nlp/results?q=" + encodeURI(searchString) + "&apikey=Rbc5P7hu4X96LXpe1n1vAnsP4Y7ENq8I", function(nlplist){

// console.log(nlplist);

var hotels = nlplist.result.hotels;


$(hotels).each (function(index){
	var aHotel = hotels[index];
    hotelIds.push(aHotel.id);

});
//// console.log(nlplist);
	// console.log(hotelIds.join());
	
	 Date.prototype.yyyymmdd = function() {
	   var yyyy = this.getFullYear().toString();
	   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	   var dd  = this.getDate().toString();
	   return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
	  };

	d = new Date();
	d.yyyymmdd();
	

var today = new Date();
var nextday = new Date(today);
nextday.setDate(today.getDate() + 1);

var joinResult = "http://terminal2.expedia.com/hotels?" + "hotelids=" + hotelIds.join() + "&checkInDate=" + today.yyyymmdd() + "&checkOutDate=" +nextday.yyyymmdd()+ "&apikey=Rbc5P7hu4X96LXpe1n1vAnsP4Y7ENq8I";

$.get(joinResult, function(hotelresult){
	console.log("hotelresult", hotelresult);

	var hotellist = hotelresult.HotelInfoList;
	var hotelinfo = hotellist.HotelInfo;

console.log("hotelinfo", hotelinfo);
	
	var hotels = [];
	var sample = hotelinfo[0];
	var city;
	if (sample && sample.Location && sample.Location.City) {
		city = window.lastCity = gun.load('primus/city/' + sample.Location.City);
		console.log("Our CITY key is", 'primus/city/' + sample.Location.City)
	}

	$(hotelinfo).each (function(index){
		var aHotel = hotelinfo[index];
		if(aHotel.Price) {
		var hotel = {
			hotelid: aHotel.HotelID,
			city: aHotel.Location.City,
			name: aHotel.Name,
			lat: aHotel.Location.GeoLocation.Latitude,
			lng: aHotel.Location.GeoLocation.Longitude,
			totalprice: aHotel.Price.TotalRate.Value,
			hotelicon: aHotel.ThumbnailUrl,
			hotelURL: aHotel.DetailsUrl,
			hotelRating: aHotel.StarRating
			
		};
		gun.load('primus/hotels/' + hotel.hotelid).blank(function(){
			this.set(hotel).key('primus/hotels/' + hotel.hotelid).get(function(point){
				expedia.group(point);
				if(city){
					city.group(point);
					console.log("adding point to the city group", point);
				}
			});

			// console.log("saving", hotel, "to gun");
		}).get(function(point){
			// console.log("hotel ID now exists");
			mapPoint(point);
		});
		// console.log(hotel);
		hotels.push(hotel);
	};

	});

	// console.log("hotels", hotels);
});
});

}