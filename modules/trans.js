const Joi = require('joi');
const mongoose = require('mongoose');

const txs = mongoose.model('txs', new mongoose.Schema({
  tx_id : {
      type: String,
      minlength: 64,
      maxlength: 64,
      trim : true,
      required: true
  },
  tx_status : {
      type : Boolean,
      default : false
  },
  tx_date : {
    type : Date,
    default : Date.now
  },
  user_id :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "users",
    required : true
  }
}));

function validateTxs(tran) {
  const schema = {
    tx_id: Joi.string().min(64).max(64).required(),
    tx_status: Joi.boolean(),
    user_id : Joi.string()
  };

  return Joi.validate(tran, schema);
}

exports.txs = txs; 
exports.validate = validateTxs;