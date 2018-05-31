var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
	text: {
		type: string
	},
	completed: {
		type: Boolean
	},
	completedAt: {
		type: number
	}
});

var newTodo = new Todo({
	text: 'Cook Dinner',
	completed: true,
	completedAt: 9
});

newTodo.save().then((doc) =>{
	console.log('Saved todo :',doc);
}, (e) =>{
	console.log('Unable to save');
});