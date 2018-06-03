var expect = require('expect');
var request = require('supertest');
var {ObjectID} = require('mongodb');

var {app} = require('./../server.js');
var {Todo} = require('./../models/todo.js');
var {User} = require('./../models/user.js');
var {todos, populateTodos, users,populateUsers} = require('./seed/seed');


// removes all the data before each test 
beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe('GET /todos', () =>{
		it('should get all todos', (done) =>{
				request(app)
					.get('/todos')
					.expect(200)
					.expect((res) => {
						expect(res.body.todos.length).toBe(2);
					})
					.end(done);
		});
});

describe('GET /todos/:id', () =>{
	it('should return todo doc', (done) =>{
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) =>{
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should return 404 if todo not found', (done) =>{
		var Hexid = new ObjectID().toHexString();
		request(app)
			.get(`/todos/${Hexid}`)
			.expect(404)
			.end(done);
	});

	it('should retrun 404 for non-id objects', (done) =>{
		request(app)
			.get('/todos/123acs')
			.expect(404)
			.end(done);
	});
});

describe('DELETE /todo/:id', () =>{

	it('should delete a todo', (done) =>{
		var Hexid = todos[1]._id.toHexString();
		request(app)
			.delete(`/todo/${Hexid}`)
			.expect(200)
			.expect((res) =>{
				expect(res.body.todo._id).toBe(Hexid);
			})
			.end((err,res) => {
				if(err){
					return done(err);
				}

				Todo.findById(Hexid).then((todo) =>{
					expect(todo).toNotExist();
					done();
				}).catch((e) => done(e));
			});
	});

	it('should return 404 if todo not found', (done) =>{
		var Hexid = new ObjectID().toHexString();
		request(app)
			.delete(`/todos/${Hexid}`)
			.expect(404)
			.end(done);
	});

	it('should retrun 404 for non-id objects', (done) =>{
		request(app)
			.delete('/todos/123acs')
			.expect(404)
			.end(done);
	});

});


describe('PATCH /todo/:id', () =>{

	it('should update a todo', (done) =>{
		var Hexid = todos[0]._id.toHexString();
		var body = {
			text: 'This is patch test',
			completed: true
		};
		request(app)
			.patch(`/todo/${Hexid}`)
			.send({body})
			.expect(200)
			.expect((res) =>{
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeA('number');
			})
			.end(done);
	});

	it('should clear completedAt when todo not completed', (done) =>{
		var Hexid = todos[1]._id.toHexString();
		var body = {
			text: 'This is patch test',
			completed: false
		};
		request(app)
			.patch(`/todos/${Hexid}`)
			.send({body})
			.expect(200)
			.expect((res) =>{
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toNotExist();
			})
			.end(done);
	});

});

describe('GET /users/me', () => {
	it('should return user if authenticated' , (done) => {
		request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token);
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toBe(users[0]._id.toHexString());
				expect(res.body.email).toBe(users[0].email);
			}).
			.end(done);
	});

	it('should return 401 if not authenticated', (done) => {
		request(app)
			.get('/users/me')
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});
			})
			.end(done);
	});
});

describe('POST /users', () => {
	it('should return user', (done) => {
		var email = 'exdsxc@exsf.com';
		var password = 'asderfg423';
		request(app)
			.post('/users')
			.send({email,password})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
				expect(res.body._id).toExist();
				expect(res.body.email).toBe(email);
			})
			.end((err) => {
				if(err){
					return done(err);
				}

				User.findOne({email}).then((user) => {
					expect(user).toExist();
					expect(user.password).toNotBe(password);
					done();
				});

			});
	});

	it('should return 400 for validation erros', (done) => {
		request(app)
			.post('/users')
			.send({email: 'asdc', password: '12'})
			.expect(400)
			.end(done);
		});


	it('should not create user if email in use', (done) => {
		request(app)
			.post('/users')
			.send({email: users[0].email, password: '1234dadww23!'})
			.expect(400)
			.end(done);
		});
});