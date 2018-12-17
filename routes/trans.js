const express = require('express');
const Joi = require('joi');

const {transDb, validate} = require('../modules/trans');


const router = express.Router();

router.get('/',async (req,res)=>{
    const trans = await transDb.find().sort('id');
    res.send(trans);
});

router.post('/create', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let tran = new transDb({ 
        trans_id : req.body.trans_id,
        trans_status : req.body.trans_status
    });
    tran = await tran.save();
    
    res.send(tran);
  });

  module.exports = router;