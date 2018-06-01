var {ObjectID} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose.js');
var {User} = require('./../server/models/user.js');

var id = '123';

if(!ObjectID.isValid()){
	console.log(`${id} not found`);
}

//find 

//findOne

//findById

User.findById(id).then((user) =>{
	if(!user){
		return console.log('User not found');
	}

	console.log(JSON.stringify(user), undefined, 2);
}).catch((e) => console.log(e));