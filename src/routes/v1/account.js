const { Router } = require('express');
const validateRequest =  require('../../middleware/schemaValidator');
const { getAccount } = require('../../middleware');

const account = Router();


account.get(
	'/:id',
    validateRequest('account/get', 'params'),
	getAccount
);

module.exports = account;