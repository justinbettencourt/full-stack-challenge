const express = require('express'), router = express.Router();
const app = express()
const fs = require('fs');

// Local Web Server testing
var zomaronAPI = require('./ZomaronAPI.json');
// var zomaronAPIUrl = require('https://api.zomaron.com/v1/coding/test1');
var userData = require('./UserData.json');
var newUser = './UserData.json'
var cors = require('cors')

// Was getting a CORS issue referencing the server from the Vue.js app
app.use(cors());
app.use(express.json());

// router.get('/zomaronAPIUrl', function (req, res) {
// 	request('https://api.zomaron.com/v1/coding/test1', function (error, response, body) {
//           console.log('error:', error); // Print the error if one occurred and handle it
//           console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//           res.send(body)
//     });
// })

app.get('/', function (req, res) {
	console.log("GET API response: " + res.statusCode);
	res.send(zomaronAPI)
})

app.get('/userData', function (req, res) {
	console.log("GET UserData response: " + res.statusCode);
	res.send(userData)
})

app.post('/userData', function (req, res) {	
	console.log("POST response: " + res.statusCode);
	console.log(req.body);
	res.send(req.body);
	fs.createWriteStream(newUser).write(JSON.stringify(req.body));
})

app.listen(3000, function () {
	console.log('Listening on port 3000...')
})
