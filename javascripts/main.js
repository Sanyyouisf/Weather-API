$(document).ready(function() {
    
    let apiKey;
    let weatherApiKey="";
    let cityId = "";
    let zipCode = "";
    let dayDate = new Date();

    WeatherAPI.firebaseCredentials().then((key) => {
        apiKey = key;
        firebase.initializeApp(apiKey);
        // console.log("apiKey in initializeApp",apiKey);
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
                        // console.log("result", result);
                        WeatherAPI.WritetToDom(result);
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
// credentials functions
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
            // FbApi.createLogoutButton(apikey);
            // writeDom(apikey);
            // createLogoutButton(apikey);
        }).catch((error) => {
            console.log("error in login user", error.message);
        });
    });


    $("#btnLogout").on('click',()=>{
        WeatherAPI.clearLogin();
        WeatherAPI.logoutUser();
        console.log("you logged out now ");
        $("#login-container").removeClass("hide");
        $("#btnLogout").addClass("hide");
        $(".weather-container").addClass("hide");
    });



});
