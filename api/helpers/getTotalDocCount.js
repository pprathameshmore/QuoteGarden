const Quote = require('../models/quote');

const getDocCount = async () => {
    return await Quote.estimatedDocumentCount();
}

exports.getDocCount = getDocCount;