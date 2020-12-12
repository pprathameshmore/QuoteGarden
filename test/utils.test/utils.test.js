const { response, isDefVar, isDefObject } = require("../../src/utils/utils");

test("should return response object", () => {
  expect(
    response(
      200,
      "Testing using JEST",
      { currentPage: 1, nextPage: 2, totalPages: 2 },
      2,
      "Data"
    )
  ).toStrictEqual({
    statusCode: 200,
    message: "Testing using JEST",
    pagination: { currentPage: 1, nextPage: 2, totalPages: 2 },
    totalQuotes: 2,
    data: "Data",
  });
});

test("should to be truthy for variable", () => {
  const n = "Hello unit test";
  expect(isDefVar(n)).toBeTruthy();
});

test("should to be truthy for object", () => {
  const obj = { name: "Testing using JEST" };
  expect(isDefObject(obj)).toBeTruthy();
});
