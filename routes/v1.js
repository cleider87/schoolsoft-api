var User = require('../models/UserModel')
var Student = require('../models/StudentModel')
var UserController = require('../business/UserController')(User)
var StudentController = require('../business/StudentController')(Student)

module.exports = function (app) {
  app.get('/api/v1/users', UserController.get)

  app.post('/api/v1/users', UserController.create)

  app.put('/api/v1/users/:user_id', UserController.update)

  app.delete('/api/v1/users/:user_id', UserController.delete)
  
  app.get('/api/v1/students', StudentController.get)

  app.post('/api/v1/students', StudentController.create)

  app.put('/api/v1/students/:student_id', StudentController.update)

  app.delete('/api/v1/students/:student_id', StudentController.delete)
}
