const express = require('express');
const Joi = require('joi');

const {users, validate} = require('../modules/user');


const router = express.Router();

// get all user
router.get('/',async (req,res)=>{
    const user = await users.find().sort('id');
    res.send(user);
});

//find by vehicle no
router.get('/:id', async (req,res)=>{
        
    const user = await users.findById(req.params.id);  
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
    
});

//post for add new member
router.post('/create', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = new users({ 
        vehicle_no:req.body.vehicle_no,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        tel : req.body.tel
    });
    user = await user.save();
    
    res.send(user);
  });

//put for update a member
router.put('/edit/:id',async (req,res)=>{

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const user = await users.findByIdAndUpdate(req.params.id, { 
        vehicle_no:req.body.vehicle_no,
        fname: req.body.fname,
        lname: req.body.lname
    }, { new: true });

    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.send(user);
});

//delete for delete a member
router.delete('/del/:id', async (req, res) => {
    const user = await users.findByIdAndRemove(req.params.id);
  
    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.send(user);
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

