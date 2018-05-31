// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {

	if(err){
		return console.log('Unable to connect to the mongodb');
	}

	console.log('Connected to MongoDB server');

	// db.collections('Users').find().toArray().then((docs) =>{
	// 	console.log('Fetching Users: ');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// },(err) =>{
	// 	console.log('Unable to fetch');
	// });


	// db.collections('Users').find({name: 'Mahesh'}).toArray().then((docs) =>{
	// 	console.log('Fetching Users: ');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// },(err) =>{
	// 	console.log('Unable to fetch');
	// });


	// db.collections('Users').find({
	// 	_id: new ObjectID('123');
	// }).toArray().then((docs) =>{
	// 	console.log('Fetching Users: ');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// },(err) =>{
	// 	console.log('Unable to fetch');
	// });


	db.collections('Users').find().count().then((count) =>{
		console.log(' Users count:  ',count);
	},(err) =>{
		console.log('Unable to fetch');
	});

	//db.close();

});