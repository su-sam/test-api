const Joi = require('joi');
const mongoose = require('mongoose');

const transDb = mongoose.model('tranDb', new mongoose.Schema({
  trans_id : {
      type: String,
      minlength: 64,
      maxlength: 64,
      required: true
  },
  trans_status : {
      type : Boolean,
      default : 0
  },
  trans_date : {
    type : Date,
    default : Date.now,
    required : true
  }
}));

function validateTranDb(tran) {
  const schema = {
    trans_id: Joi.string().min(64).max(64).required(),
    trans_status: Joi.boolean()
  };

  return Joi.validate(tran, schema);
}

exports.transDb = transDb; 
exports.validate = validateTranDb;