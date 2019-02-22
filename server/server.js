const express = require('express')
const app = express()
const fs = require('fs');
var zomaronAPI = require('./ZomaronAPI.json');
var userData = require('./UserData.json');
var newUser = './UserData.json'
var cors = require('cors')

// Was getting a CORS issue referencing the server from the Vue.js app
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
	res.send(zomaronAPI)
})

app.get('/userData', function (req, res) {
	res.send(userData)
})

app.post('/userData', function (req, res) {	
	console.log("Got response: " + res.statusCode);
	console.log(req.body);
	res.send(req.body);
	fs.createWriteStream(newUser).write(JSON.stringify(req.body));
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000...')
})
