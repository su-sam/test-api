const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const {User, validate} = require('../models/user');

const router = express.Router();

router.post('/create', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email : req.body.email});
    if (user) return res.status(400).send('Email is already registered.'); 

    user = new User({ 
        email: req.body.email,
        password: req.body.password
    });
    // user = new User(_.pick(req.body,['email','password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    const tk = user.generateAuthToken();
    res.header('x-auth-token',tk).send(_.pick(user,['_id','email']));

    await user.save();
  });

  module.exports = router;