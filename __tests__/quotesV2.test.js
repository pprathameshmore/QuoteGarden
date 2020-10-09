'use strict';

const { app } = require('../app.js');
// const supergoose = require('@code-fellows/supergoose');
const quoteModel = require('../api/models/quote.js');

// const mockRequest = supergoose(app);


describe('Test Suite for quotesV2.js', () => {
    
    it('should retrieve something from API via PROOF OF LIFE', async () => {
        let results = app.get('/api/v2/quotes/random')
        console.log('============ this is results =========', results);
    });


}); //end of describe block



// Test server status