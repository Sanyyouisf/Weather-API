//main iife 
var WeatherAPI = (() => {
    return {
        firebaseCredentials :() => {
	        return new Promise((resolve, reject) => {
	            $.ajax("apiKey.json")
	                .done((data) => {
	                    resolve(data);
	                }).fail((error) => {
	                    console.log("error in firebaseCredentials", error);
	                    reject(error);
	                });
	        	});
	    	}
    };
})();


