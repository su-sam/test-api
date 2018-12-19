const home = require('./routes/home');
const customers = require('./routes/customers');
const trans = require('./routes/trans');
const imgs = require('./routes/imgs');
const users = require('./routes/users');
const auth = require('./routes/auth');

const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const config = require('config');

Joi.objectId = require('joi-objectid')(Joi);

const app = express();
app.use(express.json());

//$ export api_jwtPrivateKey=mysecretkey
if(!config.get('jwtPrivateKey')){
    console.log('FETAL ERROR : jwtPrvateKey is not defined.');
    process.exit(1);
}

// connect to db
mongoose.connect('mongodb://localhost/car-park')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

//router that url path
app.use('/', home);
app.use('/api/customers',customers);
app.use('/api/trans',trans);
app.use('/api/imgs',imgs);
app.use('/api/users', users);
app.use('/api/auth', auth);

//network connection
const port = process.env.PORT || 3015;
app.listen(port, () => console.log(`Listening on port ${port}...`));