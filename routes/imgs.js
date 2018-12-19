const express = require('express');
const mongoose = require('mongoose');

const {Imgs, validate} = require('../models/img');
const {Customers} = require('../models/customer');


const router = express.Router();

router.get('/',async (req,res)=>{
    const img = await Imgs.find().populate('customer_id','_id vehicle_no').sort('id');
    res.send(img);
});

router.get('/:id',async (req,res)=>{
    const img = await Imgs.findById(req.params.id).populate('customer_id');
    if (!img) return res.status(404).send('The image upload history with the given ID was not found.');
    res.send(img);
});

router.post('/create', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customers.findById(req.body.customer_id);
    if(!customer) return res.status(400).send("Invalid customer id ...");
  
    let img = new Imgs({ 
        img_type: req.body.img_type,
        img_url : req.body.img_url,
        customer_id : customer,
        img_tx_id: req.body.img_tx_id
    });
    img = await img.save();
    
    res.send(img);
  });

  router.delete('/del/:id', async (req, res) => {
    const img = await Imgs.findByIdAndRemove(req.params.id);
  
    if (!img) return res.status(404).send('The image upload history with the given ID was not found.');
  
    res.send(img);
  });

  module.exports = router;