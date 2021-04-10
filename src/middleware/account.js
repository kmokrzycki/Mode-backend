// const db = require('../db');

const getAccount = async (req, res, next) => {
	try {
		// const jobs = await db.getJobs();
		res.status(200).json({all: "good !"});
	}
	catch (e) {
		next(e);
	}
};

module.exports = {
	getAccount
};