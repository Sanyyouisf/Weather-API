var WeatherAPI = ((weatherData) => {
	let SavedForecast = [];
	
	weatherData.getWeather = (apiKey) =>{
		let items =[];
		return new Promise ((resolve,reject) => {
    		let uid = WeatherAPI.credentialsCurrentUser().uid;
    		console.log("uid in getweather : ",uid);
			$.ajax ({
				method : 'GET',
				url :`${apiKey.databaseURL}/forecasts.json?orderBy="uid"&equalTo="${uid}"`
				})
			.done((data)=>{
				console.log("data in getWeather function",data);
				let response = data;
				Object.keys(response).forEach((key) =>{
					response[key].id = key;
					items.push(response[key]);
				});
				console.log("saved forcast :",items);
				resolve(items);
			})
			.fail((error)=>{
				reject(error);
				console.log("error in getWeather",error);
			});
		});		
	};


	weatherData.SaveWeather = (apiKey,newWeather) => {
		let uid= WeatherAPI.credentialsCurrentUser().uid;
		console.log("uid in addWeather",uid);
		return new Promise ((resolve,reject) => {
			$.ajax({
				method :'POST',
				url: `${apiKey.databaseURL}/forecasts.json`,
				data: JSON.stringify(newWeather)
			})				
			.done((postedData)=>{
				resolve(postedData);
				console.log("postedData in SaveWeather :",postedData);
			}).fail((error)=>{
				reject(error);
				console.log("error in addWeather function",error);
			});
		});
	};

	// to save the forcast weather
	weatherData.SaveForecast = (apiKey, newForecast) => {
		let uid= WeatherAPI.credentialsCurrentUser().uid;
		console.log("uid in SaveForecast :",uid);
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'POST',
				url: `${apiKey.databaseURL}/forecasts.json`,
				data: JSON.stringify(newForecast)
			}).done(() => {
				resolve();

			}).fail((error) => {
				reject(error);
				console.log("error in addSavedForecast: ",error);
			});
		});
	};




	return weatherData;
})(WeatherAPI || {});