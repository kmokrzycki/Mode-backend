const db = require('../service/db');

const type = 'ACCOUNT';

const getAccount = async (id) => {
    const result = await db.get(id, type);
    return result;
}

const getAll = async () => {
    const result = await db.scan(type);
    return result;
}

const add = async (data) => {
    const newRecord = await db.add(data, type);
    return newRecord;
};

const getHistory = async (id) => {
    const result = await db.scan(`TRANSACTION/${id}`);
    return result;
}

const transaction = async (id, body, record, newAmmount) => {
    const newRecord = await db.update(
        id,
        type,
        {
            balance: newAmmount
        },
        record
    );

    // Add transaction to ledger
    const transaction = await db.add(body, `TRANSACTION/${id}`);

    return newRecord;
};


module.exports = {
    getAccount,
    getAll,
    add,
    transaction,
    getHistory,
}