const bodyParser = require('body-parser')
const express = require('express')
const axios = require('axios')
const path = require('path')
const api = require('./server/routes/api')

var request = require('request')
var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/Weather")

var app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/',api)

app.listen(3000, function() {
    console.log("Server up and running on port 3000")
  })
  