const { GeneralError } = require("../../src/utils/errors");

test("should 400, 404 and 500", () => {
  expect(new GeneralError("Hello testing").getCode()).toBe(500 || 400 || 404);
});
