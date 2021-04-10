const account = require('../model/account');

const getAccount = async (req, res, next) => {
    console.log(account);
	try {
		res.status(200).json({account: account.get()});
	}
	catch (e) {
		next(e);
	}
};

module.exports = {
	getAccount
};