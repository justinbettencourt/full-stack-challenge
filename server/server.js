const express = require('express') 
const app = express();
const request = require('request')
const fs = require('fs');

// Local API
// var zomaronAPI = require('./ZomaronAPI.json');

// Remote Web Server
var bodyParser = require('body-parser')
var userData = require('./UserData.json');
var newUser = './UserData.json'
var cors = require('cors')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Local API GET
// app.get('/', function (req, res) {
// 	console.log("GET API response: " + res.statusCode);
// 	res.send(zomaronAPI)
// })

// Local API POST
// app.post('/userData', function (req, res) {	
// 	console.log("POST response: " + res.statusCode);
// 	console.log(req.body);
// 	res.send(req.body);
// 	fs.createWriteStream(newUser).write(JSON.stringify(req.body));
// })

// Remote API GET
app.get('/', function (req, res) {
	request.get({
		headers: {'content-type': 'application/json'},
		url:'https://api.zomaron.com/v1/coding/test1', 
	}, function (error, response, body) {
		console.log("GET External API response: " + response.statusCode)
		res.send(body)
		console.log(body)
    });
})

// GET saved User Data
app.get('/userData', function (req, res) {
	console.log("GET UserData response: " + res.statusCode);
	res.send(userData)
})

// This is a mess....
app.post('/userData', function (req, res) {	
	console.log('Server Response Data: ', req.body);
	request.post({
		headers: {'content-type': 'application/json'},
		url:'https://api.zomaron.com/v1/coding/test1/',
		json: userData
	}, function (error, response, body){
		console.log("POST External API response: " + response.statusCode)
		res.send(body)
		console.log(body)
		fs.createWriteStream(newUser).write(JSON.stringify(req.body));
	});
})

// Check to see if Web Server is running and listening.
app.listen(3000, function () {
	console.log('Listening on port 3000...')
})
