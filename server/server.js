const express = require('express') 
const app = express();
const request = require('request')
const fs = require('fs');

var userData = require('./UserData.json');
var cors = require('cors')
var userDataDir = './UserData.json'
var zomaronAPI = 'https://api.zomaron.com/v1/coding/test1'

app.use(cors());
app.use(express.json());

// GET Zomaron API Data
app.get('/', function (req, res) {
	request.get({
		headers: {'content-type': 'application/json'},
		url: zomaronAPI, 
	}, function (error, response, body) {
		if (error) {
			console.log('GET Error', err);
		}
		console.log("GET Response: " + response.statusCode + " * " + body)
		res.send(body)
    });
})

// GET saved User Data and display it
app.get('/userData', function (req, res) {
	console.log("GET UserData response: " + res.statusCode);
	res.send(userData)
})

// POST data to the Zomaron API.
app.post('/userData', function (req, res) {	
	request.post({
		headers: {'content-type': 'application/json'},
		url: zomaronAPI,
		json: userData
	}, function (error, response, body){
		if (error) {
			console.log('POST Error', error);
		}
		console.log("POST Response: " + response.statusCode + " * " , req.body)
		console.log(body)
		res.send(body)
		// Write to file for Web Server useage and viewing.
		fs.createWriteStream(userDataDir).write(JSON.stringify(req.body));
	});
})

// Open port 3000 and have it listening for changes.
app.listen(3000, function () {
	console.log('Listening on port 3000...')
})
