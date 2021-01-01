require('rootpath')();
const config = require('../../config');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./error/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/user', require('./user/user.controller'));
app.use('/product', require('./product/product.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = config.port;
app.listen(port, () => console.log('Server listening on port ' + port));
