const mockedDb = '../../service/db';
const account = require('../account');

//Mock all db calls
jest.mock('../../service/db', () => {
    return {
        add: jest.fn((data, type) => Promise.resolve({
            data, type,
        })),
        get: jest.fn((id, type) => Promise.resolve({
            id, type,
        })),
        scan: jest.fn((type) => Promise.resolve({
            type,
        })),
        update: jest.fn((id, type, data, originalRecord) => Promise.resolve({
            id, type, data, originalRecord
        })),
    }
})


describe("Add Account function", () => {
    test('Account Add is defined', () => {
        expect(account.add).toBeDefined();
    });

    test("It shoudl pass all relevant informations", async () => {
        const response = await account.add('test');
        expect(response).toEqual({ data: 'test', type: 'ACCOUNT' });

    });
});

describe("Get Account function", () => {
    test('Account Add is defined', () => {
        expect(account.getAccount).toBeDefined();
    });

    test("It shoudl pass all relevant informations", async () => {
        const response = await account.getAccount('myId');
        expect(response).toEqual({ id: 'myId', type: 'ACCOUNT'  });

    });
});

describe("Get getHistory function", () => {
    test('getHistory is defined', () => {
        expect(account.getHistory).toBeDefined();
    });

    test("It shoudl pass all relevant informations", async () => {
        const response = await account.getHistory('myId');
        expect(response).toEqual({ type: 'TRANSACTION/myId'  });

    });
});

describe("Get all Accounts function", () => {
    test('getAll is defined', () => {
        expect(account.getAll).toBeDefined();
    });

    test("It shoudl pass all relevant informations", async () => {
        const response = await account.getAll();
        expect(response).toEqual({ type: 'ACCOUNT'  });

    });
});


describe("Add transaction function", () => {
    test('transaction is defined', () => {
        expect(account.transaction).toBeDefined();
    });

    test("It shoudl pass all relevant informations", async () => {
        const response = await account.transaction('myTestId', 'testBody', 'record', 1000);
        expect(response).toEqual({
            id: 'myTestId',
            type: 'ACCOUNT',
            originalRecord: 'record',
            data: {
                balance: 1000,
            }
        });

    });
});