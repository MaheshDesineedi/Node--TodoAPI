var {mongoose} = require('./../server/db/mongoose.js');
var {User} = require('./../server/models/user.js');
var {Todo} = require('./../server/models/todo.js');


// Todo.remove({}).then((result) =>{
// 	console.log(result);
// },(e) =>{
// 	console.log('Error:',e);
// });

// Todo.findOneAndRemove({
// 	_id: '1234rsd24wdgxaxx31'
// }).then((todo) => {
// 	console.log(todo);
// },(e) =>{
// 	console.log('error');
// });

Todo.findByIdAndRemove('1234rsd24wdgxaxx31').then((todo) =>{
	console.log(todo);
});