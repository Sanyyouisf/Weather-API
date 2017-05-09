var WeatherAPI = ((weatherData) => {

	weatherData.loadWeather = (zipCode,weatherApiKey) => {
        return new Promise((resolve, reject) => {
            $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${weatherApiKey}`)
                .done((data) => resolve(data))
                .fail((error) => reject(error));
        });
    };

    //load the 3 days weather promise
    weatherData.loadWeather3 = (zipCode,weatherApiKey) => {
        return new Promise((resolve, reject) => {
            $.ajax(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipCode}&us&&units=imperial&cnt=3&appid=${weatherApiKey}`)
                .done((data) => resolve(data))
                .fail((error) => reject(error));
        });
    };

    //load the 7 days weather promise
    weatherData.loadWeather7 = (zipCode,weatherApiKey) => {
        return new Promise((resolve, reject) => {
            $.ajax(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipCode}&us&&units=imperial&cnt=7&appid=${weatherApiKey}`)
                .done((data) => resolve(data))
                .fail((error) => reject(error));
        });
    };

return weatherData;
})(WeatherAPI || {});