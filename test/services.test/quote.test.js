const QuoteService = require("../../src/services/quote");
const Quote = require("../../src/models/Quote");

//Test for getDocumentCount() function without passing model
test("should return 0 or greater than 0", async () => {
  const value = await QuoteService.getDocumentCount();
  expect(value).toBeGreaterThanOrEqual(0);
});

//Test for getDocumentCount() function with passing model
test("should return 0 or greater than 0", async () => {
  const value = await QuoteService.getDocumentCount(Quote);
  expect(value).toBeGreaterThanOrEqual(0);
});

//Test getRandomQuotes() function
test("should return random quotes and pagination", async () => {
  const author = "Bill Gates";
  const options = { page: 1, limit: 10 };
  const randomQuote = await QuoteService.getRandom(
    author,
    "Time",
    "lot of people",
    1,
    options
  );

  const compare = {
    docs: [
      {
        __v: 0,
        _id: "5eb17ab3b69dc744b4e81941",
        quoteAuthor: "Bill Gates",
        quoteGenre: "time",
        quoteText:
          "Oh, I think there are a lot of people who would be buying and selling online today that go up there and they get the information, but then when it comes time to type in their credit card they think twice because they're not sure about how that might get out and what that might mean for them.",
      },
    ],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    nextPage: null,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: 1,
    totalPages: 1,
  };

  /* expect.objectContaining({
      docs: expect.any(Array),
      hasNextPage: expect.any(Boolean),
      hasPrevPage: expect.any(Boolean),
      nextPage: expect.any(Number),
      page: expect.any(Number),
      pagingCounter: expect.any(Number),
      prevPage: expect.any(Number),
      totalDocs: expect.any(Number),
      totalPages: expect.any(Number),
    }) */

  expect(compare).toMatchObject(randomQuote);

  //expect(randomQuote).objectContaining(compare);
});
