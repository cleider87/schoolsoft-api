'use strict'

var StudentController = function (Student) {
  var StudentObj = {}

  StudentObj.create = function (req, res, next) {
    var newStudent = new Student(req.body)
    newStudent.save(function (err, student) {
      if (err) {
        res.json({status: false, error: err.message})
        return
      }
      res.json({status: true, student: student})
    })
  }

  StudentObj.get = function (req, res, next) {
    Student.find(function (err, students) {
      if (err) {
        res.json({status: false, error: 'Something went wrong'})
        return
      }
      res.json({status: true, student: students})
    })
  }

  StudentObj.update = function (req, res, next) {
    var completed = req.body.completed
    Student.findById(req.params.student_id, function (err, student) {
      student.completed = completed
      student.save(function (err, student) {
        if (err) {
          res.json({status: false, error: 'Status not updated'})
          return
        }
        res.json({status: true, message: 'Status updated successfully'})
      })
    })
  }

  StudentObj.delete = function (req, res, next) {
    Student.remove({_id: req.params.student_id }, function (err, student) {
      if (err) {
        res.json({status: false, error: 'Deleting Student is not successfull'})
        return
      }
      res.json({status: true, message: 'Student deleted successfully'})
    })
  }

  return StudentObj
}

module.exports = StudentController
