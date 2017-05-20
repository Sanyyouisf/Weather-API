$(document).ready(function() {
    
    let apiKey;
    let weatherApiKey="";
    let cityId = "";
    let zipCode = "";
    let forecasts = {};
    let currentWeather ={};
    let dayDate = new Date();

    //initialize the firebase
    WeatherAPI.firebaseCredentials().then((key) => {
        apiKey = key;
        firebase.initializeApp(apiKey);
    }).catch((error) => {
        console.log("error in key", error);
    });


//***************************************************
// event handeler to desplay weather 
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
    //register function
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


    //login function
    $("#LoginBtn").click(() => {
        let email = $("#inputEmail").val();
        let password = $("#inputPassword").val();
        let user = { email, password };
        WeatherAPI.loginUser(user).then((response) => {
            console.log("response in login user", response);
            WeatherAPI.clearLogin();
            $("#login-container").addClass("hide");
            $(".weather-container").removeClass("hide");
            $("#btnLogout").removeClass("hide");
            console.log("login successfly");
            WeatherAPI.createLogoutButton(apiKey);
            // WeatherAPI.createSaveDataButton(apiKey);
        }).catch((error) => {
            console.log("error in login user", error.message);
        });
    });


    $("#logout-container").on("click","#logoutButton",()=>{
        WeatherAPI.clearLogin();
        WeatherAPI.logoutUser();
        $("#forcastOutput").addClass("hide");
        $("#currentOutput").addClass("hide");
        console.log("you logged out now ");
        $("#login-container").removeClass("hide");
        $("#logout-container").addClass("hide");
        $(".weather-container").addClass("hide");
        
    });

        //save current Weather 
    $('#output').on("click",".saveWeather",() => {
        let uid= WeatherAPI.credentialsCurrentUser().uid;
           newCurrentWeather = {    
            'Day': moment.unix(currentWeather.dt).format('dddd'),
            'date': moment.unix(currentWeather.dt).format('MMM Do YY'),
            'City': currentWeather.name,
            'Temp;': currentWeather.main.temp,
            'Condition': currentWeather.weather[0].description,
            'Air Pressure': currentWeather.main.pressure,
            'Wind Speed': currentWeather.wind.speed,
            'uid':uid
            };        
        WeatherAPI.addWeather(apiKey, newCurrentWeather).then(() => {         
            console.log("newCurrentWeather",newCurrentWeather);
        $(".weather-container").addClass("hide");
                // resolve(response);
                console.log ("you saved the weather");
            }).catch((error) => {
                console.log("save Data error", error);
            });
        });

    //save forcast Weather
     $('#output').on("click",".saveForecast",() => {
        let uid= WeatherAPI.credentialsCurrentUser().uid;
        //    // for(let prop in forecasts ){
        //     newForecast = {   
        //     'Day': moment.unix(forecasts.list[i]dt).format('dddd'),
        //     'date': moment.unix(forecasts.list[i]dt).format('MMM Do YY'),
        //     'City': forecasts.city.name,
        //     'Temp;': forecasts.main.temp,
        //     'Condition': forecasts.weather[0].description,
        //     'Air Pressure': forecasts.main.pressure,
        //     'Wind Speed': forecasts.wind.speed,
        //     'uid':uid
        //     };
        // };
        // // };

            console.log("newForecast",newForecast);

        WeatherAPI.addWeather(apiKey, newForecast).then(() => {         
            console.log("newForecast",newForecast);
        $(".weather-container").addClass("hide");
                // resolve(response);
                console.log ("you saved the weather");
            }).catch((error) => {
                console.log("save Data error", error);
            });
        });



});
