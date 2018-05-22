var mongoose = require('mongoose')
var Schema = mongoose.Schema

var StudentSchema = Schema({
  documento: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  created_by: {
    type: Date,
    default: Date.now
  }
})

var StudentModel = mongoose.model('Student', StudentSchema)

module.exports = StudentModel
