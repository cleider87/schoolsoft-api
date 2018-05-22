var config = {
  port: process.env.PORT || 2000,
  db: process.env.MONGOLAB_URI || 'mongodb://localhost/school',
  test_port: 3000,
  test_db: 'mongodb://localhost/school_test'
}
module.exports = config
