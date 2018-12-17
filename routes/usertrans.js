const express = require('express');
const Joi = require('joi');

const {transDb} = require('../modules/trans')
const {userDb} = require('../modules/user')
const {validate} = require('../modules/usertrans');


const router = express.Router();

// create or update user's transaction
router.put('/create/:id',async (req,res)=>{

    // const { error } = validate(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const user = await userDb.findByIdAndUpdate(req.params.id, { 
        transactions : req.body.transactions
    }, { new: true });


    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.send(user);
});

// delete user's transaction

module.exports = router;