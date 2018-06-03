const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data =  {
	id: 6
};

var token = jwt.sign(data, 'secret');
console.log(token);

var decoded = jwt.verify(token, 'secret');
console.log('Decoded', decoded);



// var msg = 'abcd';
// var sha = SHA256(msg).toString();
// console.log(msg);
// console.log(sha);


// var data = {
// 	id: 4
// }; 

// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'secretcode').toString()
// };

// /*** MAN IN THE MIDDLE ***/
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash =  SHA256(JSON.stringify(token.data) + 'secretcode').toString();

// if(token.hash === resultHash){
// 	console.log('Data was not changed');
// }else {
// 	console.log('Data changed !!!!');
// }