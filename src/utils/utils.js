const response = (
  statusCode,
  message,
  { currentPage, nextPage, totalPages },
  totalQuotes,
  data
) => {
  return {
    statusCode,
    message,
    pagination: {
      currentPage,
      nextPage,
      totalPages,
    },
    totalQuotes,
    data,
  };
};

const isDefVar = (variable) => (variable ? true : false);

const isDefObject = (object) =>
  Object.keys(object).length === 0 ? false : true;

module.exports = {
  response,
  isDefVar,
  isDefObject,
};
