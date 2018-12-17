const express = require('express');
const Joi = require('joi');

const {userDb, validate} = require('../modules/user');


const router = express.Router();

// test JSON
// const user = [
//     {vehicle_no : 'abc', id : 1, name : 'Suchada', last_online : JSON.stringify(new Date), online_status : 0},
//     {vehicle_no : 'we3', id : 2, name : 'Manusawee', last_online : JSON.stringify(new Date), online_status : 0},
//     {vehicle_no : 'r4e', id : 3, name : 'Kemruji', last_online : JSON.stringify(new Date), online_status : 0}
// ]

// get all user
router.get('/',async (req,res)=>{
    const users = await userDb.find().populate('transactions').sort('id');
    res.send(users);
});

//find by vehicle no
router.get('/:id', async (req,res)=>{
    // const v_obj = user.find(u => u.vehicle_no === req.params.vehicle_no);
    // if(!v_obj) res.status(404).send('User not found');
    // else res.send(toggleStatus(v_obj));
    
    const user = await userDb.findById(req.params.id);  
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
    
});

//post for add new member
router.post('/create', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = new userDb({ 
        vehicle_no:req.body.vehicle_no,
        fname: req.body.fname,
        lname: req.body.lname,
        last_online: req.body.last_online,
        online_status: req.body.online_status
    });
    user = await user.save();
    
    res.send(user);
  });

//put for update a member
router.put('/edit/:id',async (req,res)=>{
    // const v_obj = user.find(u => u.vehicle_no === req.params.vehicle_no);
    // if(!v_obj) res.status(404).send('User not found');

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const user = await userDb.findByIdAndUpdate(req.params.id, { 
        vehicle_no:req.body.vehicle_no,
        fname: req.body.fname,
        lname: req.body.lname 
    }, { new: true });

    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.send(user);
});

// ==========================n=o=t==o=k=a=y=y=y=y=======================================
// update online/offline status
router.put('/toggle/:id', async (req,res)=>{

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    if(!online_status)  { // toggle the status & save last online
        const user = await userDb.findByIdAndUpdate(req.params.id, { 
            online_status: online_status,
            last_online: Date.now
        }, { new: true });
        if (!user) return res.status(404).send('The user with the given ID was not found.');
    }
    else { // toggle the status
        const user = await userDb.findByIdAndUpdate(req.params.vehicle_no, { 
            online_status: req.params.online_status        
        }, { new: true });
        if (!user) return res.status(404).send('The user with the given ID was not found.');
    }

    res.send(user);
})

// ===========================================================================

//delete for delete a member
router.delete('/del/:id', async (req, res) => {
    const user = await userDb.findByIdAndRemove(req.params.id);
  
    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.send(user);
  });

// //toggle user_status for online-offline and update DATETIME
// function toggleStatus(v_obj){
//     let user_status = v_obj.online_status;
//     user_status = !(user_status); //toggle status
//     v_obj.online_status = user_status;
//     //update time only true->false for last online time
//     if(!user_status) v_obj.last_online = JSON.stringify(new Date());
//     return v_obj
// }


module.exports = router;