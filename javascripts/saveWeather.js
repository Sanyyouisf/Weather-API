var WeatherAPI = ((weatherData) => {
	weatherData.getWeather = (apiKey) =>{
		let items =[];
		return new Promise ((resolve,reject) => {
    		let uid=WeatherAPI.credentialsCurrentUser().uid;
			$.ajax (`${apiKey.databaseURL}/forecasts.json?orderBy="uid"&equalTo="${uid}"`)
			.done((data)=>{
				console.log("data in getWeather function",data);
				let response = data;
				Object.keys(response).forEach((key) =>{
					console.log("key",key);
					response[key].id = key;
					items.push(response[key]);
					console.log("response[key]",response[key]);
					console.log("items array in getWeather",items);
				});
				resolve(items);
			})
			.fail((error)=>{
				reject(error);
				console.log("error in getWeather",error);
			});
		});		
	};


	weatherData.addWeather = (apiKey,newData) => {
		uid= WeatherAPI.credentialsCurrentUser().uid;
		console.log("uid in addWeather",uid);
		return new Promise ((resolve,reject) => {
			$.ajax({
				method :'post',
				url: `${apiKey.databaseURL}/forecasts.json`,
				data:JSON.stringify(newData)
			})				
			.done(()=>{
				// console.log({newData});
				resolve();
				// console.log("newData in add Weather function ",newData);
			}).fail((error)=>{
				reject(error);
				console.log("error in addWeather function",error);
			});
		});
	};




	return weatherData;
})(WeatherAPI || {});