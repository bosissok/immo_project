// const { assert } = require('console');
// const crypto = require('crypto');
// let stubRequest = { session : {} };
// let stubResponse = { locals : {} };
// const token = require('../services/LcCsrfToken.js');

// describe('Création token csrf', () => {

//     it('Test generate token csrf', (done) => {
//         assert.strictEqual(stubRequest.session.token_csrf, 'undefined');
//         token.generate(stubRequest, stubResponse, () => {});
//         assert.notStrictEqual(typeof stubRequest.session.token_csrf, 'undefined');
//         done();
//         });
//     });