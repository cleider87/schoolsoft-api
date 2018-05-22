'use strict'

var should = require('should'),
  sinon = require('sinon'),
  mongoose = require('mongoose')

require('sinon-mongoose')

var chai = require('chai')
var expect = chai.expect

var StudentModel = require('../../models/StudentModel')

describe('StudentController TestCases', function () {
  describe('Create Student', function () {
    it('Should call create student', function () {
      var saveStub = sinon.stub()

      function StudentTest () {
        this.save = saveStub
      }

      var req = {
        body: {
          document: '000000000',
          firstname: 'Cleider',
          lsstname: 'Herrera',
          email: 'cleider87@gmail.com'
        }
      }

      var res = {}, next = {}
      var StudentController = require('../../business/StudentController')(StudentTest)
      StudentController.create(req, res, next)
      sinon.assert.calledOnce(saveStub)
    })

    it('Should save an Student', function (done) {
      var studentMock = sinon.mock(new StudentModel({
          document: '000000000',
          firstname: 'Cleider',
          lsstname: 'Herrera',
          email: 'cleider87@gmail.com'
        }))

      var student = studentMock.object
      var expectedResult = {status: true}
      studentMock.expects('save').yields(null, expectedResult)

      student.save(function (err, result) {
        studentMock.verify()
        studentMock.restore()
        expect(result.status).to.be.true
        done()
      })
    })

    it('Should return error, if post not saved', function (done) {
      var studentMock = sinon.mock(new StudentModel({
          document: '000000000',
          firstname: 'Cleider',
          lsstname: 'Herrera',
          email: 'cleider87@gmail.com'
        }))

      var student = studentMock.object
      var expectedResult = {status: false}
      studentMock.expects('save').yields(expectedResult, null)

      student.save(function (err, result) {
        studentMock.verify()
        studentMock.restore()
        expect(err.status).to.not.be.true
        done()
      })
    })
  })

  describe('List Students', function () {
    it('Should call find once', function (done) {
      var studentMock = sinon.mock(StudentModel)
      var expectedResult = {status: true, student: []}

      studentMock.expects('find').yields(null, expectedResult)

      StudentModel.find(function (err, result) {
        studentMock.verify()
        studentMock.restore()
        expect(result.status).to.be.true
        done()
      })
    })

    it('Should return error', function (done) {
      var studentMock = sinon.mock(StudentModel)
      var expectedResult = {status: false, error: 'Something went wrong'}

      studentMock.expects('find').yields(expectedResult, null)

      StudentModel.find(function (err, result) {
        studentMock.verify()
        studentMock.restore()
        expect(err.status).to.not.be.true
        done()
      })
    })
  })

  describe('Update an Student', function () {
    it('Should update the student with new value', function (done) {
      var studentMock = sinon.mock(new StudentModel({
          document: '000000000',
          firstname: 'Cleider',
          lsstname: 'Herrera',
          email: 'cleider87@gmail.com'
        }))
      var Student = studentMock.object
      var expectedResult = {status: true}

      studentMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult)

      Student.save({_id: 12345}, function (err, result) {
        studentMock.verify()
        studentMock.restore()
        expect(result.status).to.be.true
        done()
      })
    })

    it('Should return error if update action is failed', function (done) {
      var studentMock = sinon.mock(new StudentModel({
          document: '000000000',
          firstname: 'Cleider',
          lsstname: 'Herrera',
          email: 'cleider87@gmail.com'
        }))
      var Student = studentMock.object
      var expectedResult = {status: false}

      studentMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null)

      Student.save({_id: 12345}, function (err, result) {
        studentMock.verify()
        studentMock.restore()
        expect(err.status).to.not.be.true
        done()
      })
    })
  })

  describe('Delete an Student', function () {
    it('Should delete student of gived id', function (done) {
      var studentMock = sinon.mock(StudentModel)
      var expectedResult = {status: true}
      studentMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult)
      StudentModel.remove({_id: 12345}, function (err, result) {
        studentMock.verify()
        studentMock.restore()
        expect(result.status).to.be.true
        done()
      })
    })

    it('Should return error if delete action is failed', function (done) {
      var studentMock = sinon.mock(StudentModel)
      var expectedResult = {status: false}
      studentMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null)
      StudentModel.remove({_id: 12345}, function (err, result) {
        studentMock.verify()
        studentMock.restore()
        expect(err.status).to.not.be.true
        done()
      })
    })
  })
})
