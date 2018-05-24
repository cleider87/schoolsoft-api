var chai = require('chai')

var chaiHttp = require('chai-http')

process.env.NODE_ENV = 'test'

var app = require('../server')

var expect = chai.expect

chai.use(chaiHttp)

describe('Procesos Básicos', function () {
  describe('/api/v1/users', function () {
    it('Responds with status 200', function (done) {
      chai.request(app)
        .get('/api/v1/users')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          done()
        })
    })    
  })

})
