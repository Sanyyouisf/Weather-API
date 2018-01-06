var WeatherAPI = ((fireData) => {

    //function to register the user
    fireData.registerUser = (credentials) => {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
                .then((authData) => {
                    resolve(authData);
                    console.log("authData in register User", authData);
                }).catch((error) => {
                    reject(error);
                    console.log("error in register User", error);
                });
        });
    };

    //function to log in 
    fireData.loginUser = (credentials) => {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
                .then((authData) => {
                    resolve(authData);
                    console.log("authData in login User ", authData);
                }).catch((error) => {
                    reject(error);
                    console.log("error in login User", error);
                });
        });
    };

    fireData.credentialsCurrentUser = () => {
        return firebase.auth().currentUser;
    };

    //function to logout 
    fireData.logoutUser = () => {
        firebase.auth().signOut(); //token killer
    };

    return fireData;
})(WeatherAPI || {});
