const express = require('express');
const Joi = require('joi');
const userDb = require('../modules/user');
const router = express.Router();

//test JSON
const user = [
    {vehicle_no : 'abc', id : 1, name : 'Suchada', last_online : JSON.stringify(new Date), online_status : 0},
    {vehicle_no : 'we3', id : 2, name : 'Manusawee', last_online : JSON.stringify(new Date), online_status : 0},
    {vehicle_no : 'r4e', id : 3, name : 'Kemruji', last_online : JSON.stringify(new Date), online_status : 0}
]

router.get('/',(req,res)=>{
    res.send(user);
});

//find by vehicle no
router.get('/:vehicle_no',(req,res)=>{
    const v_obj = user.find(u => u.vehicle_no === req.params.vehicle_no);
    if(!v_obj) res.status(404).send('User not found');
    else res.send(toggleStatus(v_obj));
});

//post for add new member

//put for update a member
router.put('/:vehicle_no',(req,res)=>{
    const v_obj = user.find(u => u.vehicle_no === req.params.vehicle_no);
    if(!v_obj) res.status(404).send('User not found');

    
});
//delete for delete a member

//toggle user_status for online-offline and update DATETIME
function toggleStatus(v_obj){

    let user_status = v_obj.online_status;

    user_status = !(user_status); //toggle status
    v_obj.online_status = user_status;

    //update time only true->false for last online time
    if(!user_status) v_obj.last_online = JSON.stringify(new Date());

    return v_obj
}


module.exports = router;