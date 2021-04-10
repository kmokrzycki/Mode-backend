const { Router } = require('express');
const account = Router();

const { getAccount } = require('../../middleware');

account.get(
	'/',
	getAccount
);

module.exports = account;