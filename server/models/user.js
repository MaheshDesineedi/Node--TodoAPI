const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not an email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['email','_id']);
};

UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens.push({access, token});

	return user.save().then(() => {
		return token;
	});
};

var User = mongoose.model('User',UserSchema);



module.exports = {
	User
};