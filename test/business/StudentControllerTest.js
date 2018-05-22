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
    it('Should call create user', function () {
      var saveStub = sinon.stub()

      function StudentTest () {
        this.save = saveStub
      }

      var req = {
        body: {
          documento: '000000000',
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
      var userMock = sinon.mock(new StudentModel({
          documento: '000000000',
          firstname: 'Cleider',
          lsstname: 'Herrera',
          email: 'cleider87@gmail.com'
        }))

      var user = userMock.object
      var expectedResult = {status: true}
      userMock.expects('save').yields(null, expectedResult)

      user.save(function (err, result) {
        userMock.verify()
        userMock.restore()
        expect(result.status).to.be.true
        done()
      })
    })

    it('Should return error, if post not saved', function (done) {
      var userMock = sinon.mock(new StudentModel({
          documento: '000000000',
          firstname: 'Cleider',
          lsstname: 'Herrera',
          email: 'cleider87@gmail.com'
        }))

      var user = userMock.object
      var expectedResult = {status: false}
      userMock.expects('save').yields(expectedResult, null)

      user.save(function (err, result) {
        userMock.verify()
        userMock.restore()
        expect(err.status).to.not.be.true
        done()
      })
    })
  })

  describe('List Students', function () {
    it('Should call find once', function (done) {
      var userMock = sinon.mock(StudentModel)
      var expectedResult = {status: true, user: []}

      userMock.expects('find').yields(null, expectedResult)

      StudentModel.find(function (err, result) {
        userMock.verify()
        userMock.restore()
        expect(result.status).to.be.true
        done()
      })
    })

    it('Should return error', function (done) {
      var userMock = sinon.mock(StudentModel)
      var expectedResult = {status: false, error: 'Something went wrong'}

      userMock.expects('find').yields(expectedResult, null)

      StudentModel.find(function (err, result) {
        userMock.verify()
        userMock.restore()
        expect(err.status).to.not.be.true
        done()
      })
    })
  })

  describe('Update an Student', function () {
    it('Should update the user with new value', function (done) {
      var userMock = sinon.mock(new StudentModel({
          documento: '000000000',
          firstname: 'Cleider',
          lsstname: 'Herrera',
          email: 'cleider87@gmail.com'
        }))
      var Student = userMock.object
      var expectedResult = {status: true}

      userMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult)

      Student.save({_id: 12345}, function (err, result) {
        userMock.verify()
        userMock.restore()
        expect(result.status).to.be.true
        done()
      })
    })

    it('Should return error if update action is failed', function (done) {
      var userMock = sinon.mock(new StudentModel({
          documento: '000000000',
          firstname: 'Cleider',
          lsstname: 'Herrera',
          email: 'cleider87@gmail.com'
        }))
      var Student = userMock.object
      var expectedResult = {status: false}

      userMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null)

      Student.save({_id: 12345}, function (err, result) {
        userMock.verify()
        userMock.restore()
        expect(err.status).to.not.be.true
        done()
      })
    })
  })

  describe('Delete an Student', function () {
    it('Should delete user of gived id', function (done) {
      var userMock = sinon.mock(StudentModel)
      var expectedResult = {status: true}
      userMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult)
      StudentModel.remove({_id: 12345}, function (err, result) {
        userMock.verify()
        userMock.restore()
        expect(result.status).to.be.true
        done()
      })
    })

    it('Should return error if delete action is failed', function (done) {
      var userMock = sinon.mock(StudentModel)
      var expectedResult = {status: false}
      userMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null)
      StudentModel.remove({_id: 12345}, function (err, result) {
        userMock.verify()
        userMock.restore()
        expect(err.status).to.not.be.true
        done()
      })
    })
  })
})
