const index = require('../');


describe("Account is exported", () => {
    test('Account is defined', () => {
        expect(index.account).toBeDefined();
    });
});