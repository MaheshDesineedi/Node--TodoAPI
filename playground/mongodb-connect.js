// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {

	if(err){
		return console.log('Unable to connect to the mongodb');
	}

	console.log('Connected to MongoDB server');

	db.collection('Users').insertOne({
		_id: 123,
		name: 'Mahesh',
		age: 20,
		location: 'Hyderabad'
	}, (err, results) =>{
		if(err){
			return console.log('Unable to insert Users',err);
		}

		//console.log(JSON.stringyfy(results.ops, undefined , 2));
		console.log(results.ops[0]._id.getTimeStamp());
	});

	db.close();

});