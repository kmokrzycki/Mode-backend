const { Router } = require('express');
const validateRequest =  require('../../middleware/schemaValidator');
const actions = require('../../middleware/account');

const route = Router();

route.get(
	'/',
	actions.getAllAccounts
);

route.put(
	'/',
    validateRequest('account/add'),
	actions.addAccount
);

route.post(
    '/:id/transfer',
    validateRequest('account/transfer'),
    actions.transfer
);

route.get(
    '/:id/history',
    validateRequest('account/get', 'params'),
    actions.getAccountHistory
);

route.get(
	'/:id',
    validateRequest('account/get', 'params'),
	actions.getAccount
);

module.exports = route;