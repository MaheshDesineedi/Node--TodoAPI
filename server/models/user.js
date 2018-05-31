var mongoose = require('mongoose');

var User = mongoose.model('Users',{
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	password: {
		type: Boolean
	},
	phone: {
		type: Number
	}
});

module.exports = {
	User
};