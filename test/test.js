const assert = require('assert');
const repoUser = require('../src/repository/User.js');

describe('Test mail', () => {

    it('email exist', (done) => {
        (new repoUser).emailExists('michel@gmail.com').then((result) => {
            console.log('===>'+result)
            assert.strictEqual(result, true);
            done();
        });
    });
 
    it('email not exist', (done) => {
        (new repoUser).emailExists('not-exist@gmail.com').then((result) => {
            assert.strictEqual(result, false);
            done();
        });
    });
});




