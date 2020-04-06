const Quote = require('../models/quote');

const getDocCount = async () => {
    return await Quote.countDocuments();
}

exports.getDocCount = getDocCount;