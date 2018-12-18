const express = require('express');
const Joi = require('joi');

const {txs, validate} = require('../modules/trans');
const {users} = require('../modules/user')


const router = express.Router();

router.get('/',async (req,res)=>{
    const trans = await txs.find().populate('user_id','_id vehicle_no').sort('id');
    res.send(trans);
});

router.get('/:id',async (req,res)=>{
    const tran = await txs.findById(req.params.id).populate('user_id');
    if (!tran) return res.status(404).send('The transaction with the given ID was not found.');
    res.send(tran);
});

router.post('/create', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const user = await users.findById(req.body.user_id);
    if(!user) return res.status(400).send("Invalid user id ...");
  
    let tran = new txs({ 
        tx_id : req.body.tx_id,
        tx_status : req.body.tx_status,
        user_id : user
    });
    tran = await tran.save();
    
    res.send(tran);
  });

  router.delete('/del/:id', async (req, res) => {
    const tran = await txs.findByIdAndRemove(req.params.id);
  
    if (!tran) return res.status(404).send('The transaction with the given ID was not found.');
  
    res.send(tran);
  });

  module.exports = router;