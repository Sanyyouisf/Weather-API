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
        console.log("getting user // uid :: ", uid);
        let users = [];
        return new Promise ((resolve, reject) => {
            $.ajax({
                method: 'GET',
                url: `${keys.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
            }).done((user) => {
                let response = user;
                Object.keys(response).forEach((key) => {
                    response[key].id = key;
                    users.push(response[key]);
                });
            console.log("users :: ", users);
            console.log("users[0] :: ", users[0]);
                resolve(users[0]);
            }).fail((error) => {
                reject(error);
            });
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