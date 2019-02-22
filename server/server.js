const express = require('express')
const app = express()
const axios = require('axios')
var config = require('./ZomaronAPI.json');

var cors = require('cors')

// Was getting a CORS issue referencing the server from the Vue.js app
app.use(cors());

app.get('/', function (req, res) {
	res.send(config)
})

app.post('/', function (req, res) {
	res.send(config)
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000...')
})
