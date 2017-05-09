// var WeatherAPI = ((weatherData) => {
// 	//this function convert the object to an array and loop through it and push the object to the array
// 	oldCrap.getTodos = (apikeys) =>{
// 		let items =[];
// 		return new Promise ((resolve,reject) => {
//     		let uid=FbApi.credentialsCurrentUser().uid;
// 			$.ajax (`${apikeys.databaseURL}/items.json?orderBy="uid"&equalTo="${uid}"`)
// 			.done((data)=>{
// 				//response here is object  of items
// 				let response = data;
// 				// console.log("response",response);
// 				//Object.keys convert the response object to an array 
// 				//forEach will loop through this aray [item0,item1,item2]
// 				Object.keys(response).forEach((key) =>{
// 					// console.log("key",key);
// 					response[key].id = key;
// 					//adding new item to the array that have (item.id=0 for example)
// 					//and push it to the array
// 					items.push(response[key]);
// 					// console.log("response[key]",response[key]);
// 					// console.log("items",items);
// 				});
// 				resolve(items);
// 				// console.log("items in resolve",items);
// 			})
// 			.fail((error)=>{
// 				reject(error);
// 			});
// 		});		
// 	};


// 	oldCrap.addTodo = (apikeys,newTodo) => {
// 		newTodo.uid= FbApi.credentialsCurrentUser().uid;
// 		return new Promise ((resolve,reject) => {
// 			//Load data from the server using a HTTP POST request
// 			$.ajax({
// 				method :'post',
// 				url: `${apikeys.databaseURL}/items.json`,
// 				data:JSON.stringify(newTodo)//this method converts a JavaScript value to a JSON string
// 			}).done(()=>{
// 				resolve();
// 			}).fail((error)=>{
// 				reject(error);
// 			});
// 		});
// 	};


// 	//delete the item from the array
// 	oldCrap.deleteTodo = (apikeys,id) => {
// 		return new Promise ((resolve,reject) => {
// 			$.ajax({
// 				method :'delete',
// 				url: `${apikeys.databaseURL}/items/${id}.json`
// 			}).done(()=>{
// 				resolve();
// 			}).fail((error)=>{
// 				reject(error);
// 			});
// 		});
// 	};

// 	oldCrap.editTodo = (apikeys,editTodo,id) => {
// 		editTodo.uid= FbApi.credentialsCurrentUser().uid;
// 		return new Promise ((resolve,reject) => {
// 			//POST is used to create” and “PUT is used to edit.
// 			$.ajax({
// 				method :'put',
// 				url: `${apikeys.databaseURL}/items/${id}.json`,
// 				data:JSON.stringify(editTodo)//
// 			}).done(()=>{
// 				resolve();
// 			}).fail((error)=>{
// 				reject(error);
// 			});
// 		});
// 	};

// 	return weatherData;
// })(WeatherAPI || {});