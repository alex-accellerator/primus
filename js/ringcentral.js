
var rcsdk = new RCSDK(),
    Ringout = rcsdk.getRingoutHelper();

         platform = rcsdk.getPlatform();
         platform.apiKey = btoa('90ZRLC6uTFiS2KOuJbnP6Q:-44fmCGdTBC4psPZYrtp3wHI-3h_EkToiWc8UhZeIp9A');
         platform.server = "https://platform.devtest.ringcentral.com";
         platform.authorize({
		    username: '16503514543', // phone number in full format
		    extension: '', // leave blank if direct number is used
		    password: 'UGWdN42HcC'
			
        }).then(function (){
	console.log("Authorized with Ringcentral");
	
//	platform.apiCall({
//		method: 'POST',
//		url: Ringout.createUrl(),
//		post: {
//			from: {phoneNumber: '17322764444'},
//			    to: {phoneNumber: '8088807058'}
//		}
//	})
	
}).catch(function(e) {
             alert(e.message || e.description || 'Server cannot authorize user');

});

