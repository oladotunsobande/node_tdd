const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../app');

const should = chai.should();

chai.use(chaiHttp);

describe('Authors Test', () => {

  describe('/POST author', () => {
    it('should add a new author', (done) => {
      let author = {
        firstName: 'Maxwell',
        lastName: 'George',
        email: 'm.george@aol.com'
      };

      chai.request(server)
        .post('/api/author')
        .send(author)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Author created successfully');
          res.body.data.should.have.property('_id');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('email');

          done();
        });
    });

    it('should not add author with existing email', (done) => {
      let author = {
        firstName: 'Nathaniel',
        lastName: 'Bassey',
        email: 'm.george@aol.com'
      };

      chai.request(server)
        .post('/api/author')
        .send(author)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Email exists');

          done();
        });
    });

    it('should not add author without firstName', (done) => {
      let author = {
        lastName: 'George',
        email: 'm.george@aol.com'
      };

      chai.request(server)
        .post('/api/author')
        .send(author)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('firstName is required');

          done();
        });
    });

    it('should not add author without lastName', (done) => {
      let author = {
        firstName: 'Maxwell',
        email: 'm.george@aol.com'
      };

      chai.request(server)
        .post('/api/author')
        .send(author)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('lastName is required');

          done();
        });
    });

    it('should not add author without email', (done) => {
      let author = {
        firstName: 'Maxwell',
        lastName: 'George'
      };

      chai.request(server)
        .post('/api/author')
        .send(author)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('email is required');

          done();
        });
    });
  });
});