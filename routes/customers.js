const express = require('express');
const mongoose = require('mongoose');

const {customers, validate} = require('../models/customer');


const router = express.Router();

// get all customer
router.get('/',async (req,res)=>{
    const customer = await customers.find().sort('id');
    res.send(customer);
});

//find by vehicle no
router.get('/:id', async (req,res)=>{
        
    const customer = await customers.findById(req.params.id);  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
    
});

//post for add new member
router.post('/create', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let customer = new customers({ 
        vehicle_no:req.body.vehicle_no,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        tel : req.body.tel
    });
    customer = await customer.save();
    
    res.send(customer);
  });

//put for update a member
router.put('/edit/:id',async (req,res)=>{

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await customers.findByIdAndUpdate(req.params.id, { 
        vehicle_no:req.body.vehicle_no,
        fname: req.body.fname,
        lname: req.body.lname
    }, { new: true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    res.send(customer);
});

//delete for delete a member
router.delete('/del/:id', async (req, res) => {
    const customer = await customers.findByIdAndRemove(req.params.id);
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    res.send(customer);
  });


  module.exports = router;


// //toggle user_status for online-offline and update DATETIME
// function toggleStatus(v_obj){
//     let user_status = v_obj.online_status;
//     user_status = !(user_status); //toggle status
//     v_obj.online_status = user_status;
//     //update time only true->false for last online time
//     if(!user_status) v_obj.last_online = JSON.stringify(new Date());
//     return v_obj
// }

