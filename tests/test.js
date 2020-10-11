const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

const should = chai.should();
const assert = chai.assert;

chai.use(chaiHttp);

describe("GET", () => {
	describe("genres", () => {
		it("should get all genres", (done) => {
			chai
				.request(server)
				.get("/api/v2/genres")
				.end((err, res) => {
					const {
						body: { statusCode, genres },
					} = res;

					res.should.have.status(200);
					res.should.be.json;
					assert.equal(statusCode, 200);
					assert.isArray(genres);
					genres.forEach((genre) => {
						assert.isString(genre);
					});
					done();
				});
		});

		it("should get quotes by genre", (done) => {
			chai
				.request(server)
				.get("/api/v2/genres/fear?page=4&limit=3")
				.end((err, res) => {
					const {
						body: { statusCode, message, totalPages, currentPage, quotes },
					} = res;

					res.should.have.status(200);
					res.should.be.json;
					assert.equal(statusCode, 200);
					assert.equal(message, "Quotes in fear genre");
					assert.equal(currentPage, 4);
					assert.isNumber(totalPages);
					assert.isArray(quotes);
					assert.equal(quotes.length, 3);
					quotes.forEach((quote) => {
						assert.isObject(quote);
						assert.equal(quote.quoteGenre, "fear");
						assert.hasAllKeys(quote, [
							"_id",
							"quoteText",
							"quoteAuthor",
							"quoteGenre",
						]);
					});
					done();
				});
		});
	});

	describe("quotes", () => {
		it("should get all quotes in a page", (done) => {
			chai
				.request(server)
				.get("/api/v2/quotes?page=3&limit=7")
				.end((err, res) => {
					const {
						body: { statusCode, message, totalPages, currentPage, quotes },
					} = res;

					res.should.have.status(200);
					res.should.be.json;
					assert.equal(statusCode, 200);
					assert.equal(message, "All quotes");
					assert.equal(currentPage, 3);
					assert.isNumber(totalPages);
					assert.isArray(quotes);
					assert.equal(quotes.length, 7);
					quotes.forEach((quote) => {
						assert.isObject(quote);
						assert.hasAllKeys(quote, ["_id", "quoteText", "quoteAuthor"]);
					});
					done();
				});
		});

		it("should get a random quote", (done) => {
			chai
				.request(server)
				.get("/api/v2/quotes/random")
				.end((err, res) => {
					const {
						body: { statusCode, quote },
					} = res;

					res.should.have.status(200);
					res.should.be.json;
					assert.equal(statusCode, 200);
					assert.isObject(quote);
					assert.hasAllKeys(quote, [
						"_id",
						"quoteText",
						"quoteAuthor",
						"quoteGenre",
					]);
					done();
				});
		});

		it("should get quotes by keyword", (done) => {
			chai
				.request(server)
				.get("/api/v2/quotes/explore?page=1&limit=5")
				.end((err, res) => {
					const {
						body: { statusCode, message, totalPages, currentPage, quotes },
					} = res;

					res.should.have.status(200);
					res.should.be.json;
					assert.equal(statusCode, 200);
					assert.equal(message, "Quotes which includes explore keywords");
					assert.equal(currentPage, 1);
					assert.isNumber(totalPages);
					assert.isArray(quotes);
					assert.equal(quotes.length, 5);
					quotes.forEach((quote) => {
						assert.isObject(quote);
						assert.isOk(quote.quoteText.includes("explore"));
						assert.hasAllKeys(quote, [
							"_id",
							"quoteText",
							"quoteAuthor",
							"quoteGenre",
						]);
					});
					done();
				});
		});
	});

	describe("authors", () => {
		it("should get quotes by author", (done) => {
			chai
				.request(server)
				.get("/api/v2/authors/J.%20K.%20Rowling?page=2&limit=6")
				.end((err, res) => {
					const {
						body: { statusCode, message, totalPages, currentPage, quotes },
					} = res;

					res.should.have.status(200);
					res.should.be.json;
					assert.equal(statusCode, 200);
					assert.equal(message, "Quotes by J. K. Rowling");
					assert.equal(currentPage, 2);
					assert.isNumber(totalPages);
					assert.isArray(quotes);
					assert.equal(quotes.length, 5);
					quotes.forEach((quote) => {
						assert.isObject(quote);
						assert.equal(quote.quoteAuthor, "J. K. Rowling");
						assert.hasAllKeys(quote, [
							"_id",
							"quoteText",
							"quoteAuthor",
							"quoteGenre",
						]);
					});
					done();
				});
		});
	});
});
