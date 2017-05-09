var WeatherAPI = ((DomData)=>{
	
    //write to dom the current day weather
    DomData.WritetToDom = (result) => {
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
    DomData.WritetNToDom = (result) => {
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






	return DomData;
})(WeatherAPI || {});