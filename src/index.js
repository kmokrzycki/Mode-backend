
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('config');
const compression = require('compression');
const helmet = require('helmet');
const { loadSchemas } = require('./service/schema');
const db = require('./service/db');



const app = express();
loadSchemas('schema');
app.use(helmet());
app.use(compression());

const {host, port} = config.get('server');

const api = require('./routes');
const { errorResponse } = require('./middleware/error');

app.use(bodyParser.json({ limit: '5MB' }));
app.use(require('morgan')('dev'));

app.use('/api', api);
app.use(errorResponse);


app.listen(port, () => {
  console.log(`✅ 😀 - API server is running at http://${host}:${port}`);
  console.log('Using DB:', config.get('services.firebase.databaseURL'));
});
