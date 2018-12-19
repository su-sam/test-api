const Joi = require('joi');
const mongoose = require('mongoose');

const Txs = mongoose.model('Txs', new mongoose.Schema({
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
  customer_id :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Customers",
    trim : true,
    required : true
  }
}));

function validateTxs(tran) {
  const schema = {
    tx_id: Joi.string().min(64).max(64).required(),
    tx_status: Joi.boolean(),
    customer_id : Joi.objectId().required()
  };

  return Joi.validate(tran, schema);
}

exports.Txs = Txs; 
exports.validate = validateTxs;