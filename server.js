var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var config = require('./config/config')
var cors = require('cors')
var app = express()

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': 'true'}))
// parse application/json
app.use(bodyParser.json())
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}))

require('./routes/v1')(app)

if (process.env.NODE_ENV === 'test') {
  mongoose.connect(config.test_db)
} else {
  mongoose.connect(config.db)
}

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db)
})

module.exports = app
