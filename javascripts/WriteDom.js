var WeatherAPI = ((DomData)=>{
	
    //write to dom the current day weather
    DomData.WritetToDom = (result) => {
        let outputString = "";
        outputString += `<div class="oneDayTemp">`;
        outputString += `<div class="day temp col-xs-4"><p>${moment.unix(result.dt).format('dddd')} </p> </div>`;
        outputString += `<div class="dat temp col-xs-4"><p>${moment.unix(result.dt).format('MMM Do YY')}</p>  </div>`;
        outputString += `<div class="city"><p class=" placeName col-xs-4">${result.name}</p> </div>`;
        outputString += `<br>`;
        outputString += `<div class="temp"><p>Temp :</p>${result.main.temp} Fahrenheit </div>`;
        outputString += `<div class="condition"><p>  Condition :</p>${result.weather[0].description}</div>`;
        outputString += `<div class="pressure"><p>Air Pressure :</p>${result.main.pressure} hpa </div>`;
        outputString += `<div class="wspeed"><p>Wind Speed :</p>${result.wind.speed}   miles/hour</div>`;
        outputString += `<div><a href="#" class="saveWeather"> save </a><a href="#" class= "deleteForecast">  delete</a></div>`;
        outputString += `</div>`;
        $("#currentOutput").html(outputString);
        $("#ShowSavedButton").removeClass("hide");
        $("#ClearAllButton").removeClass("hide");
    };


    //write to dom 3 and 7 days weather
    DomData.WritetNToDom = (result) => {
        let output2String = "";
        output2String += `<div class="nDaysTemp">`;
        output2String += `<div><p class="placeName col-xs-11">City  :${result.city.name}</p> </div>`;
        output2String += `<br>`;
        for (let i = 0; i < result.list.length; i++) {
            output2String += `<div><p class="temp col-xs-3">day :${moment.unix(result.list[i].dt).format('dddd')} </p> </div>`;
            output2String += `<div><p class="temp col-xs-3">date :${moment.unix(result.list[i].dt).format('MMM Do YY')} </p> </div>`;
            output2String += `<div><p class="temp">Temp :</p>${result.list[i].temp.day} Fahrenheit </div>`;
            output2String += `<div><p class="condition">  Condition :</p>${result.list[i].weather[0].description}</div>`;
            output2String += `<div><p class="pressure">Air Pressure :</p>${result.list[i].pressure} hpa </div>`;
            output2String += `<div><p class="wspeed">Wind Speed :</p>${result.list[i].speed}   miles/hour</div>`;
            output2String += `<br>`;
        }
        output2String += `<div><a href="#" class= "saveForecast">save </a><a href="#" class= "deleteForecast">  delete</a></div>`;
        output2String += `</div>`;
        $("#forcastOutput").html(output2String);
        $("#ShowSavedButton").removeClass("hide");
        $("#ClearAllButton").removeClass("hide");
    };

    //write saved data 
    DomData.WritetSavedToDom = (result) => {
        let output2String = "";
        output2String += `<div class="nDaysTemp">`
        console.log("result.length :",result.length);
        for (let i = 0; i < result.length; i++) {
            output2String += `<div><p class="placeName col-xs-12">City  :${result[i].City}</p> </div>`;
            output2String += `<div><p class="temp col-xs-6">day : ${result[i].Day}</p> </div>`;
            output2String += `<div><p class="temp col-xs-6">date : ${result[i].date} </p> </div>`;
            output2String += `<div><p class="temp">Temp :${result[i].Temp} Fahrenheit </p></div>`;
            output2String += `<div><p class="condition">  Condition :${result[i].Condition} </p></div>`;
            output2String += `<div><p class="pressure">Air Pressure :${result[i].AirPressure}  hpa </p></div>`;
            output2String += `<div><p class="wspeed">Wind Speed :${result[i].WindSpeed} miles/hour </p></div>`;
            output2String += `<br>`;
        }
        output2String += `</div>`;
        $("#forcastOutput").html(output2String);
        $("#ShowSavedButton").removeClass("hide");
        $("#ClearAllButton").removeClass("hide");
    };




	return DomData;
})(WeatherAPI || {});