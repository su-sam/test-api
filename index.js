//I need to connect to my db whatever u said!!

const home = require('./routes/home');
const user = require('./routes/user');
const tran = require('./routes/trans')

const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

// connect to db
mongoose.connect('mongodb://localhost/car-park')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

//router that url path
app.use('/', home);
app.use('/user',user);
app.use('/trans',tran);

//network connection
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening on port ${port}...`));