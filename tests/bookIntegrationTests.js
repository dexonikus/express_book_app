var should = require('should'),
	request = require('supertest'),
	app = require('../server.js'),
	mongoose = require('mongoose'),
	book = mongoose.model('Book'),
	agent = request.agent(app);

describe('Book Crud Test', function() {
	it('should allow a book to be posted and return a read and _id', function(done) {
		var bookPost = {
			title: 'New Book',
			author: 'Dejan Milicevic',
			genre: 'Adventure'
		};

		agent.post('/api/books')
		.send(bookPost)
		.expect(200)
		.end(function(err, results) {
			results.body.read.should.equal(false);
			results.body.should.have.property('_id');
			done();
		})
	})

	afterEach(function(done) {
		book.remove().exec();
		done();
	})
})