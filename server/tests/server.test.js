var expect = require('expect');
var request = require('supertest');

var {app} = require('./../server.js');
var {Todo} = require('./../models/todo.js')


const todos = [{
	text: 'First test todo'
}, {
	text: 'Second test todo'
}];

// removes all the data before each test 
beforeEach((done) =>{
	Todo.remove({}).then(() =>{
		return	Todo.insertMany(todos);
	}).then(() => done());
});

describe('POST /todos', () =>{

	
	it('should create new todo', (done) =>{
		var text = 'This is a test';
		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) =>{
				expect(res.body.text).toBe(text);
			})
			.end((err,res) => {
				if(err){
					return done(err);
				}

				Todo.find({text}).then((todos) =>{
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done(err);
				}).catch((e) => done(e));
			});
	});

	it('should not create a todo',(done) => {
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err,res) =>{
			if(err){
				return done(err);
			}

			Todo.find().then((todos) =>{
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => done(e));
		});
	});

});