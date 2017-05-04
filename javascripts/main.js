$(document).ready(function() {
    const apiKey = "";
    let cityId = "";
    let zipCode = "";
    let dayDate = new Date();

    //event for clicking the current weather button
    $("#btnZip").on("click", (e) => {
        $("#currentOutput").text("");
        $("#forcastOutput").text("");
        zipCode = $("#zipCode").val();
        if (checkZip(zipCode) === true) {
	        loadWeather(zipCode)
	        .then((result) => {
	            console.log("result", result);
	            WriteTempToDom(result);
	        })
	        .catch((error) => {
	                console.log(error);
	        });
        }
    });


    //event for enter key  
    $("#zipCode").keyup((e) => {
    	if (e.keyCode === 13 ){
    		console.log("you pressed enter key");
    		$("#currentOutput").text("");
            $("#forcastOutput").text("");
        	zipCode = $("#zipCode").val();
	        if (checkZip(zipCode) === true) {
    			loadWeather(zipCode)
        		.then((result) => {
	            	console.log("result", result);
	            	WriteTempToDom(result);
        		})
        		.catch((error) => {
            		console.log(error);
        		});
			}
		}

    });


    //event for clicking the 3 days weather button
    $("#btnZip3").on("click", (e) => {
        $("#forcastOutput").text("");
        zipCode = $("#zipCode").val();
        if (checkZip(zipCode) === true) {
            loadWeather3(zipCode)
            .then((result) => {
                console.log("result", result);
                WriteTempNToDom(result);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    });

    //event for clicking the 7 days weather button
    $("#btnZip7").on("click", (e) => {
        $("#forcastOutput").text("");
        if (checkZip(zipCode) === true) {
            zipCode = $("#zipCode").val();
            loadWeather7(zipCode)
            .then((result) => {
                console.log("result", result);
                WriteTempNToDom(result);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    });

    //to check if the zipcode entered is 5 digits number
    const checkZip = (zipCode) => {
        if ($.isNumeric($("#zipCode").val()) && $("#zipCode").val().length === 5) {
            return true;
        } else {
            alert("enter a valid 5 digit zipCode");
        }
    };


    //load the current day weather promise
    const loadWeather = (zipCode) => {
        return new Promise((resolve, reject) => {
            $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&APPID=${apiKey}`)
                .done((data) => resolve(data))
                .fail((error) => reject(error));
        });
    };


    //load the 3 days weather promise
    const loadWeather3 = (zipCode) => {
        return new Promise((resolve, reject) => {
            $.ajax(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipCode}&us&&units=imperial&cnt=3&appid=${apiKey}`)
                .done((data) => resolve(data))
                .fail((error) => reject(error));
        });
    };

    //load the 7 days weather promise
    const loadWeather7 = (zipCode) => {
        return new Promise((resolve, reject) => {
            $.ajax(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipCode}&us&&units=imperial&cnt=7&appid=${apiKey}`)
                .done((data) => resolve(data))
                .fail((error) => reject(error));
        });
    };


    //write to dom the current day weather
    const WriteTempToDom = (result) => {
        let outputString = "";
        outputString += `<div class="oneDayTemp">`;
        outputString += `<div class="temp col-xs-4"><p>day :${moment.unix(result.dt).format('dddd')} </p> </div>`;
        outputString += `<div class="temp col-xs-4"><p>date :${moment.unix(result.dt).format('MMM Do YY')}</p>  </div>`; 
        outputString += `<div ><p class="placeName col-xs-4">City  :${result.name}</p> </div>`;
        outputString += `<br>`;
        outputString += `<div class="temp"><p>Temp :</p>${result.main.temp} Fahrenheit </div>`;
        outputString += `<div class="condition"><p>  Condition :</p>${result.weather[0].description}</div>`;
        outputString += `<div class="pressure"><p>Air Pressure :</p>${result.main.pressure} hpa </div>`;
        outputString += `<div class="wspeed"><p>Wind Speed :</p>${result.wind.speed}   miles/hour</div>`;
        outputString += `</div>`;
        $("#currentOutput").html(outputString);
    };

    //write to dom 3 and 7 days weather

    const WriteTempNToDom = (result) => {
        let output2String = "";
        output2String += `<div class="nDaysTemp">`;
        output2String += `<div><p class="placeName col-xs-11">City  :${result.city.name}</p> </div>`;
        output2String += `<br>`;
        for (let i = 0; i < result.list.length; i++) {
            output2String += `<div><p class="temp col-xs-6">day :${moment.unix(result.list[i].dt).format('dddd')} </p> </div>`;
            output2String += `<div><p class="temp col-xs-6">date :${moment.unix(result.list[i].dt).format('MMM Do YY')} </p> </div>`; 
            output2String += `<br>`;
            output2String += `<div><p class="temp">Temp :</p>${result.list[i].temp.day} Fahrenheit </div>`;
            output2String += `<div><p class="condition">  Condition :</p>${result.list[i].weather[0].description}</div>`;
            output2String += `<div><p class="pressure">Air Pressure :</p>${result.list[i].pressure} hpa </div>`;
            output2String += `<div><p class="wspeed">Wind Speed :</p>${result.list[i].speed}   miles/hour</div>`;
            output2String += `<br>`;
        }
        output2String += `</div>`;
        $("#forcastOutput").html(output2String);
    };




});
