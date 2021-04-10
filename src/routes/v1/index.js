const { Router } = require('express');

const account = require('./account');

const v1 = Router();

v1.use('/account', account);

module.exports = v1;