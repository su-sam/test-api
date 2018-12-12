const express = require('express');
const router = express.Router();

const user = [
    {vehicle_no : 'abc', id : 1, name : 'Suchada', last_online : Date, online_status : 0},
    {vehicle_no : 'we3', id : 2, name : 'Manusawee', last_online : Date, online_status : 0},
    {vehicle_no : 'r4e', id : 3, name : 'Kemruji', last_online : Date, online_status : 0}
]

router.get('/',(req,res)=>{
    res.send(user);
});

router.get('/:vehicle_no',(req,res)=>{
    const v_obj = user.find(u => u.vehicle_no === req.params.vehicle_no);
    if(!v_obj) res.status(404).send('User not found');
    else res.send(toggleStatus(v_obj));
});

function toggleStatus(v_obj){
    let user_status = v_obj.online_status;
    user_status = !(user_status);
    v_obj.online_status = user_status;
    return v_obj
}

module.exports = router;