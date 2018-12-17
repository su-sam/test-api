const Joi = require('joi');
const mongoose = require('mongoose');
const {transDb} = require('./trans')

const userDb = mongoose.model('userDb', new mongoose.Schema({
  vehicle_no: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 7
  },
  fname:{
      type: String,
      required: true,
      minlength:3,
      maxlength:50
  },
  lname:{
      type: String,
      required: true,
      minlength:3,
      maxlength:50
  },
  last_online:{
      type: Date,
      default: Date.now
  },
  online_status:{
      type: Boolean,
      default: 0
  },
//   payment_method:{
//     type : mongoose.Schema.Types.ObjectId,
//     ref : ''
//   },
  transactions:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'tranDb'
  },
//   entryImgs:{
//     type : mongoose.Schema.Types.ObjectId,
//     ref : ''
//   }
}));

function validateUserDb(user) {
  const schema = {
    vehicle_no: Joi.string().min(5).max(7).required(),
    fname: Joi.string().min(3).max(50).required(),
    lname: Joi.string().min(3).max(50).required(),
  };

  return Joi.validate(user, schema);
}

exports.userDb = userDb; 
exports.validate = validateUserDb;