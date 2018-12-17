const Joi = require('joi');
const mongoose = require('mongoose');
const {transDb} = require('./trans')

const users = mongoose.model('users', new mongoose.Schema({
  vehicle_no: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 7,
    trim : true
  },
  fname:{
      type: String,
      required: true,
      minlength:3,
      maxlength:50,
      trim : true
  },
  lname:{
      type: String,
      required: true,
      minlength:3,
      maxlength:50,
      trim : true
  },
  last_online:{
      type: Date,
      default: Date.now
  },
  email : {
      type: String,
      trim : true,
      required: true,
      minlength:3,
      maxlength:50
  },
  online_status:{
      type: Boolean,
      default: 0
  },
  tel : {
      type : String,
      trim : true,
      required: true,
      minlength:10,
      maxlength:10
  }
}));

function validateUser(user) {
  const schema = {
    vehicle_no: Joi.string().min(5).max(7).required(),
    fname: Joi.string().min(3).max(50).required(),
    lname: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(50).required(),
    tel: Joi.string().min(10).max(10).required()
  };

  return Joi.validate(user, schema);
}

exports.users = users; 
exports.validate = validateUser;