var User = require('../models/UserModel')
var UserController = require('../business/UserController')(User)

module.exports = function (app) {
  app.get('/api/v1/users', UserController.get)

  app.post('/api/v1/users', UserController.create)

  app.put('/api/v1/users/:user_id', UserController.update)

  app.delete('/api/v1/users/:user_id', UserController.delete)
}
