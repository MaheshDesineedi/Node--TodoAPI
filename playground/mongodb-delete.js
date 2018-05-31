// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {

	if(err){
		return console.log('Unable to connect to the mongodb');
	}

	console.log('Connected to MongoDB server');

	db.collections('Users').deleteMany({name: 'Andrew'}).then((result) =>{
		console.log(result);
	});

	db.collections('Users').FindOneandDelete({
		_id: new ObjectID('123')
	}).then((result) =>{
		console.log(result);
	});

	db.close();

});