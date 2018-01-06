$(document).ready(function() {
    
    let apiKey = "";
    let weatherApiKey="";
    let cityId = "";
    let zipCode = "";
    let forecasts = [];
    let currentWeather ={};
    let newForecast = [];
    let dayDate = new Date();




    //initialize the firebase
    WeatherAPI.firebaseCredentials().then((key) => {
        apiKey = key;
        firebase.initializeApp(apiKey);
    }).catch((error) => {
        console.log("error in key", error);
    });


//***************************************************
// event handeler to display weather 
//***************************************************
    //clicking the current weather button
    $("#btnZip").on("click", (e) => {
        $("#currentOutput").text("");
        $("#forcastOutput").text("");
        zipCode = $("#zipCode").val();
        if (checkZip(zipCode) === true) {
            WeatherAPI.loadWeather(zipCode,weatherApiKey)
                .then((result) => {
                    console.log("result in the current weather", result);
                    WeatherAPI.WritetToDom(result);
                    currentWeather = result ;
                })
                .catch((error) => {
                    console.log("error in current weather",error);
                });
        }
    });


    //event for enter key  
    $("#zipCode").keyup((e) => {
        if (e.keyCode === 13) {
            console.log("you pressed enter key");
            $("#currentOutput").text("");
            $("#forcastOutput").text("");
            zipCode = $("#zipCode").val();
            if (checkZip(zipCode) === true) {
                // console.log("after checkZip",checkZip);
                WeatherAPI.loadWeather(zipCode,weatherApiKey)
                    .then((result) => {
                        console.log("result when hit enter", result);
                        WeatherAPI.WritetToDom(result);
                        currentWeather = result ;
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
            WeatherAPI.loadWeather3(zipCode,weatherApiKey)
                .then((result) => {
                    console.log("result", result);
                    WeatherAPI.WritetNToDom(result);
                    forecasts = result ;
                    console.log("forecasts in forcastOutput3",forecasts);
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
            WeatherAPI.loadWeather7(zipCode,weatherApiKey)
                .then((result) => {
                    console.log("result", result);
                    WeatherAPI.WritetNToDom(result);
                    forecasts = result ;
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


//******************************************
//  user credentials functions
//******************************************
    //Register function
    $("#RegisterBtn").click(() => {
        let email = $("#inputEmail").val();
        let password = $("#inputPassword").val();
        let username = $("#inputUsername").val();
        let user = { email, password }; //we use this when the key and value is the same.
        console.log("user in register function",user);
        WeatherAPI.registerUser(user).then((response) => {
            WeatherAPI.clearLogin();
            console.log("response.id in register", response.uid);
            let newUser = {
                uid: response.uid,
                username: username
            };
            WeatherAPI.addUser(apiKey, newUser).then((response) => {
                WeatherAPI.loginUser(user).then((response) => {
                    console.log("login successfly");
                    WeatherAPI.clearLogin();
                    $("#login-container").addClass("hide");
                    $(".weather-container").removeClass("hide");
                    $("#btnLogout").removeClass("hide");
                    WeatherAPI.createLogoutButton(apiKey);
                    // writeDom(apikey);
                }).catch((error) => {
                    console.log("error in register", error.message);
                });
            }).catch((error) => {
                console.log("error in register", error);
            });
        }).catch((error) => {
            console.log("error in register", error);
        });

    });


    //Login function
    $("#LoginBtn").click(() => {
        let email = $("#inputEmail").val();
        let password = $("#inputPassword").val();
        let user = { email, password };
        WeatherAPI.loginUser(user).then((response) => {
            console.log("response in login user", response);
            WeatherAPI.clearLogin();
            $("#login-container").addClass("hide");
            $(".weather-container").removeClass("hide");
            $("#logout-container").removeClass("hide");
            WeatherAPI.createLogoutButton(apiKey);
        }).catch((error) => {
            console.log("error in login user", error.message);
        });
    });


    //Logout function
    $("#logout-container").on("click","#logoutButton",()=>{
        WeatherAPI.clearLogin();
        WeatherAPI.logoutUser();
        $("#forcastOutput").addClass("hide");
        $("#currentOutput").addClass("hide");
        $("#login-container").removeClass("hide");
        $("#logout-container").addClass("hide");
        $(".weather-container").addClass("hide");
        
    });

        //save current Weather 
    $('#output').on("click",".saveWeather",() => {
        console.log("you click to save the weather");
        let uid= WeatherAPI.credentialsCurrentUser().uid;
        console.log("uid inside saveWeather event :",uid);
           newCurrentWeather = {    
            'Day': moment.unix(currentWeather.dt).format('dddd'),
            'date': moment.unix(currentWeather.dt).format('MMM Do YY'),
            'City': currentWeather.name,
            'Temp': currentWeather.main.temp.toString(),
            'Condition': currentWeather.weather[0].description,
            'AirPressure': currentWeather.main.pressure.toString(),
            'WindSpeed': currentWeather.wind.speed.toString(),
            'uid':uid
            };  
        WeatherAPI.SaveWeather(apiKey, newCurrentWeather)
        .then(() => {         
            console.log("newCurrentWeather after :",newCurrentWeather);
            $("#currentOutput").addClass("hide");
            console.log ("you saved the weather");
            $("#zipCode").attr("placeholder", "Zip Code");
            $("#zipCode").val("");
        })
        .catch((error) => {
            console.log("save Data error", error);
        });
    });


    //to save forecast
    $('#output').on("click",".saveForecast",() => {
        forecasts=[];
        console.log("you click to save the forecast");
        let uid= WeatherAPI.credentialsCurrentUser().uid;
        console.log("uid inside saveWeather event :",uid);
        for (let i = 0; i < forecasts.length; i++) {
           newForecast = {    
            'Day': moment.unix(newForecast.list[i].dt).format('dddd'),
            'date': moment.unix(newForecast.list[i].dt).format('MMM Do YY'),
            'City': newForecast.name,
            'Temp': newForecast.list[i].temp.day.toString(),
            'Condition': newForecast.list[i].weather[0].description,
            'AirPressure': newForecast.list[i].pressure.toString(),
            'WindSpeed': newForecast.list[i].speed.toString(),
            'uid':uid
            };
            forecasts.push[newForecast];
        }; 
        console.log("forecasts before:",forecasts);
        WeatherAPI.SaveForecast(apiKey, forecasts)
        .then(() => {         
            console.log("forecasts in save forcasts :",forecasts);
            $("#currentOutput").addClass("hide");
            console.log ("you saved the weather");
            $("#zipCode").attr("placeholder", "Zip Code");
            $("#zipCode").val("");
        })
        .catch((error) => {
            console.log("save Data error", error);
        });
    });


    //to delete displayedforcast 
        $('#output').on("click",".deleteForecast",(event) => {
            console.log("event :",event);
        WeatherAPI.deleteSavedForecast(apiKey, event.target.id)
        .then(() => {
            console.log("delete the forcast");
            $('#output').empty();
        }).catch((error) => {
            console.log("error in deleteSavedForecast", error);
        });
    });


//to clear all data 
// event handler for <clear all button> 
$("#logout-container").on("click","#ClearAllButton",() => {
    // clear user input field
    $("#zipCode").attr("placeholder", "Zip Code");
    $("#zipCode").val("");
    // clear output data from DOM
    $("#currentOutput").empty();
    $("#forcastOutput").empty();
    $("#ShowSavedButton").empty();
});


     //to show saved forcast 
    $("#logout-container").on("click","#ShowSavedButton",() => {
    // clear user input field
    $("#zipCode").attr("placeholder", "Zip Code");
    $("#zipCode").val("");
    // clear output data from DOM
    $("#currentOutput").empty();
    $("#forcastOutput").empty();
    //resturn saved forcast
    let uid= WeatherAPI.credentialsCurrentUser().uid;
    console.log("uid in ShowSavedButton:",uid);
    WeatherAPI.getWeather(apiKey,uid)
        .then((result) => {
            console.log("result in getweather :", result);
            WeatherAPI.WritetSavedToDom(result);
            })
        .catch((error) => {
            console.log("error in getWeather: ",error);
            });
    });



});
