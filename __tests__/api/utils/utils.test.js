'use strict';

const { response, documentCount } = require('../../../api/utils/utils.js');

describe('Testing the utility functions: ', () => {
    

    describe('Testing the response utility: ', () => {
        
        it('Should take in and return the correct parameters', () => {
            
            let mockInput = {
                statusCode: 200,
                message: 'working',
                totalPages: 100,
                currentPage: 2,
                quotes: {},
            };



            let actual = response(mockInput)

            expect(actual.statusCode).toEqual(200);
            expect(actual.message).toBe('working');
            expect(actual.totalPages).toBe(100);
            expect(actual.currentPage).toBe(2);
            expect(actual.quotes).toStrictEqual({});
            
        });


        // it('Should fire off estimateDocumentCount()', async () => {
        //     let callback = () => {return {}};
        //     let mockInput = {
        //         estimateDocumentCount: callback,
        //     };

        //     let actual = await documentCount(mockInput);
        //     let expected = {}

        //     expect(actual).toEqual(expected);

        // });

    });

});