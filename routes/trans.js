const express = require('express');
const mongoose = require('mongoose');

const {Txs, validate} = require('../models/tran');
const {Customers} = require('../models/customer')


const router = express.Router();

router.get('/',async (req,res)=>{
    const trans = await Txs.find().populate('customer_id','_id vehicle_no').sort('id');
    res.send(trans);
});

router.get('/:id',async (req,res)=>{
    const tran = await Txs.findById(req.params.id).populate('customer_id');
    if (!tran) return res.status(404).send('The transaction with the given ID was not found.');
    res.send(tran);
});

router.post('/create', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customers.findById(req.body.customer_id);
    if(!customer) return res.status(400).send("Invalid customer id ...");
  
    let tran = new Txs({ 
        tx_id : req.body.tx_id,
        tx_status : req.body.tx_status,
        customer_id : customer
    });
    tran = await tran.save();
    
    res.send(tran);
  });

  router.delete('/del/:id', async (req, res) => {
    const tran = await Txs.findByIdAndRemove(req.params.id);
  
    if (!tran) return res.status(404).send('The transaction with the given ID was not found.');
  
    res.send(tran);
  });

  module.exports = router;