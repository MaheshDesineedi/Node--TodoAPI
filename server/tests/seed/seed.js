const {ObjectID} = require('mongoDB');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo.js');
const {User} = require('./../../models/user.js');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();

const users = [{
	_id: userOneId,
	email : 'mame@gmail.com',
	password: 'asfggdgghred',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'},'abc123').toString()
	}]
}, {
	_id: userTwoId,
	email : 'andrew@gmail.com',
	password: 'asfggdgghrerd',
}];

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 666
}];

const populateTodos = (done) =>{
	Todo.remove({}).then(() =>{
		return	Todo.insertMany(todos);
	}).then(() => done());
};

const populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		return Promise.all([userOne, userTwo]);
	}).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};