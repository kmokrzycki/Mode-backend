const account = require('../model/account');


const getAccount = async (req, res, next) => {
    const record = await account.getAccount(req.params.id)
    try {
        if (!record) {
            return res.status(404).json({ message: 'No such user!' });
        }
        res.status(200).json({ account: record });
    }
    catch (e) {
        next(e);
    }
};

const addAccount = async (req, res, next) => {
    try {
        const newAccount = await account.add(req.body);
        res.status(201).json({ account: newAccount });
    }
    catch (e) {
        next(e);
    }
};

const getAllAccounts = async (req, res, next) => {
    const accounts = await account.getAll();
    try {
        res.status(200).json({ accounts: accounts });
    }
    catch (e) {
        next(e);
    }
};

const getAccountHistory = async (req, res, next) => {
    const transactions = await account.getHistory(req.params.id);
    try {
        res.status(200).json({ transactions });
    }
    catch (e) {
        next(e);
    }
};


const transfer = async (req, res, next) => {
    const { body, params } = req;
    try {
        const record = await account.getAccount(params.id)

        const newAmmount = record.balance + body.ammount;

        if (newAmmount < 0) {
            return res.status(400).json({ message: 'insufficient funds !' });
        }

        const newBalance = await account.transaction(params.id, body, record, newAmmount);

        res.status(200).json({ account: newBalance });
    }
    catch (e) {
        next(e);
    }
};

module.exports = {
    getAccount,
    getAllAccounts,
    addAccount,
    transfer,
    getAccountHistory,
};