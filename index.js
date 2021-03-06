var config = require('./config/config')
var morgan = require('morgan')
var server = require('./server')

if (process.env.NODE_ENV === 'test') {
  server.listen(config.test_db, function (err) {
    if (err) { throw err }
    console.log('Testing App on port ' + config.test_port)
  })
} else {
  server.use(morgan('dev'))
  server.listen(config.port, function (err) {
    if (err) { throw err }
    console.log('App listening on port ' + config.port)
  })
}