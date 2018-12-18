const express = require('express');
const Joi = require('joi');

const {imgs, validate} = require('../modules/img');
const {users} = require('../modules/user')


const router = express.Router();

router.get('/',async (req,res)=>{
    const img = await imgs.find().populate('user_id','_id vehicle_no').sort('id');
    res.send(img);
});

router.get('/:id',async (req,res)=>{
    const img = await imgs.findById(req.params.id).populate('user_id');
    if (!img) return res.status(404).send('The image upload history with the given ID was not found.');
    res.send(img);
});

router.post('/create', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const user = await users.findById(req.body.user_id);
    if(!user) return res.status(400).send("Invalid user id ...");
  
    let img = new txs({ 
        img_type: req.body.img_type,
        img_url : req.body.img_url,
        user_id : user,
        img_tx_id: req.body.img_tx_id
    });
    img = await img.save();
    
    res.send(img);
  });

  router.delete('/del/:id', async (req, res) => {
    const img = await imgs.findByIdAndRemove(req.params.id);
  
    if (!img) return res.status(404).send('The image upload history with the given ID was not found.');
  
    res.send(img);
  });

  module.exports = router;