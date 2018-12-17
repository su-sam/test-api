//I need to connect to my db whatever u said!!

const home = require('./routes/home');
const db = require('./routes/db');
const user = require('./routes/user');
const express = require('express');

const app = express();

//router that url path
app.use('/', home);
app.use('/db',db);
app.use('/user',user);

//network connection
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));