var WeatherAPI= ((userData)=>{


    //function to add the user to database
    //The JSON.stringify() method converts a JavaScript value to a JSON string
    userData.addUser = (keys, newUser) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'POST',
                url: `${keys.databaseURL}/users.json`,
                data: JSON.stringify(newUser)
            }).done((response) => {
                resolve(response);
                console.log("response in add user", response);
            }).fail((error) => {
                onsole.log("error in add user", error);
                reject(error);
            });
        });
    };


    userData.getUser = (keys, uid) => {
        console.log("uid in get user ", uid);
        let users = [];
        return new Promise ((resolve, reject) => {
            $.ajax({
                method: 'GET',
                url: `${keys.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
            }).done((user) => {
                let response = user;
                console.log("response in getUser" ,response );
                Object.keys(response).forEach((key) => {
                    response[key].id = key;
                    users.push(response[key]);
                    console.log("response[key]",response[key]);
                    console.log("users",users);
                });
                resolve(users[0]);
            }).fail((error) => {
                reject(error);
            });
        });
    };


    //creat logout button 
    userData.createLogoutButton = (apiKey) => {
    let uid=WeatherAPI.credentialsCurrentUser().uid;
    console.log("uid in createLogoutButton ",uid);
    WeatherAPI.getUser(apiKey,uid).then((user)=>{
        let logoutButton = `<button class ="btn btn-danger" id="logoutButton">LOGOUT ${user.username}</button>`;
      $("#logout-container").html(logoutButton);  
    });
  };


    //to clear text boxes
    userData.clearLogin = () => {
        $("#inputEmail").val("");
        $("#inputPassword").val("");
        $("#inputUsername").val("");
    };



	return userData;
})(WeatherAPI || {});