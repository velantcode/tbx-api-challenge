/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const server = require('../src/index')
const should = chai.should() // eslint-disable-line

const FilesController = require('../src/controllers/FilesController')

chai.use(chaiHttp)

// ==========================================

describe('Test parser data', () => {
  // data to return null value
  const data1 = 'file,text,number,hex'
  // data to return null value
  const data2 = 'file,text,number,hex\ntest2.csv,oQQRq\n'
  // data to return one lines of file
  const data3 = 'file,text,number,hex\ntest2.csv,oQQRq\ntest2.csv,jmiFPqF,119,b310aa4917d67a29cee300c752e174e3'

  // test return null
  describe('Test parser data to return null.', () => {
    it("it should return 'null' when the data is null or undefined.", (done) => {
      const res = FilesController.parseData()
      expect(res).to.eq(null)
      done()
    })

    it("it should return 'null' when the data isn't a string.", (done) => {
      const res = FilesController.parseData({})
      expect(res).to.eq(null)
      done()
    })

    it(
      "it should return 'null' when the data is a empty string or not contains values.",
      (done) => {
        const res = FilesController.parseData(data1)
        expect(res).to.eq(null)
        done()
      })

    it(
      "it should return 'null' if the supplied text string contains bad values.",
      (done) => {
        const res = FilesController.parseData(data2)
        expect(res).to.eq(null)
        done()
      })
  })

  // test return converted values
  describe('Test parser data must be return the converted values.', () => {
    it('it should return an object converted values.', (done) => {
      const res = FilesController.parseData(data3)
      expect(res).to.be.a('object')
      expect(res).to.have.keys(['file', 'lines'])
      expect(res.lines.length).to.eq(1)
      done()
    })
  })
})

// ==================================================

describe('Files list', () => {
  describe('/GET files data list', () => {
    it('it should GET all the files data', (done) => {
      chai.request(server)
        .get('/files/data')
        .end((_, res) => {
          res.should.have.status(200)
          res.should.to.be.json // eslint-disable-line
          res.body.should.be.a('array')
          res.body.length.should.be.gte(0)
          done()
        })
    })
  })
})

// ==================================================

describe('Test for one file', () => {
  describe('/GET a single file', () => {
    const fileName = 'test3.csv'
    const fileNameError = 'test3.c'

    it('it should GET a file with their respective data by means of their name', (done) => {
      chai.request(server)
        .get(`/files/data?fileName=${fileName}`)
        .end((_, res) => {
          res.should.have.status(200)
          res.should.to.be.json // eslint-disable-line
          res.body.should.be.a('object')
          res.body.should.have.keys(['file', 'lines'])
          done()
        })
    })

    it('it should show a 404 code with the respective error message.', (done) => {
      chai.request(server)
        .get(`/files/data?fileName=${fileNameError}`)
        .end((_, res) => {
          res.should.have.status(404)
          res.should.to.be.json // eslint-disable-line
          res.body.should.be.a('object')
          res.body.should.have.key('error')
          res.body.error.should.be.eq('Not found!')
          done()
        })
    })
  })
})

// ==================================================

describe('Test to get original data from external API', () => {
  describe('/GET data from external API', () => {
    it("it should GET the data from external API and this must be an object with the key 'files'.", (done) => {
      chai.request(server)
        .get('/files/list')
        .end((_, res) => {
          res.should.have.status(200)
          res.should.to.be.json // eslint-disable-line
          res.body.should.be.a('object')
          res.body.should.be.have.key('files')
          res.body.files.should.be.a('array')
          res.body.files.length.should.be.gte(0)
          res.body.files[0].should.be.a('string')
          done()
        })
    })
  })
})

// ==================================================

describe('Test any path.', () => {
  describe('/GET any path.', () => {
    it('it should return a 404 with a respective error message.', (done) => {
      chai.request(server)
        .get('/any')
        .end((_, res) => {
          res.should.have.status(404)
          res.should.to.be.json // eslint-disable-line
          res.body.should.be.a('object')
          res.body.should.be.have.key('error')
          res.body.error.should.be.a('string')
          res.body.error.should.be.eq('Not found!')
          done()
        })
    })
  })
  describe('/POST any path.', () => {
    it('it should return a 404 with a respective error message.', (done) => {
      chai.request(server)
        .post('/any')
        .end((_, res) => {
          res.should.have.status(404)
          res.should.to.be.json // eslint-disable-line
          res.body.should.be.a('object')
          res.body.should.be.have.key('error')
          res.body.error.should.be.a('string')
          res.body.error.should.be.eq('Not found!')
          done()
        })
    })
  })
  describe('/PUT any path.', () => {
    it('it should return a 404 with a respective error message.', (done) => {
      chai.request(server)
        .put('/any')
        .end((_, res) => {
          res.should.have.status(404)
          res.should.to.be.json // eslint-disable-line
          res.body.should.be.a('object')
          res.body.should.be.have.key('error')
          res.body.error.should.be.a('string')
          res.body.error.should.be.eq('Not found!')
          done()
        })
    })
  })
  describe('/DELETE any path.', () => {
    it('it should return a 404 with a respective error message.', (done) => {
      chai.request(server)
        .delete('/any')
        .end((_, res) => {
          res.should.have.status(404)
          res.should.to.be.json // eslint-disable-line
          res.body.should.be.a('object')
          res.body.should.be.have.key('error')
          res.body.error.should.be.a('string')
          res.body.error.should.be.eq('Not found!')
          done()
        })
    })
  })
})
