var expect = require('chai').expect

var Student = require('../../models/StudentModel')

describe('StudentModel TestCase', function () {
  it('Should throw error by firstname empty', function (done) {
    var student = new Student()
    student.validate(function (err) {
      expect(err.errors.firstname).to.exist
      done()
    })
  })
  
    it('Should throw error by lastname empty', function (done) {
    var student = new Student()
    student.validate(function (err) {
      expect(err.errors.lastname).to.exist
      done()
    })
  })
  
  it('Should throw error by email empty', function (done) {
    var student = new Student()
    student.validate(function (err) {
      expect(err.errors.email).to.exist
      done()
    })
  })
})
