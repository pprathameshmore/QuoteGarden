exports.response = function response({
  statusCode,
  message,
  totalPages,
  currentPage,
  quotes,
}) {
  return { statusCode, message, totalPages, currentPage, quotes };
};

exports.documentCount = async function documentCount(document) {
  try {
    return await document.estimatedDocumentCount();
  } catch (error) {
    console.log(error);
  }
};
