const Joi = require('joi');
const mongoose = require('mongoose');

const Customers = mongoose.model('Customers', new mongoose.Schema({
  vehicle_no: {
    type: String,
    minlength: 5,
    maxlength: 7,
    trim : true,
    required: true
  },
  fname:{
      type: String,
      minlength:3,
      maxlength:50,
      trim : true,
      required: true
  },
  lname:{
      type: String,
      minlength:3,
      maxlength:50,
      trim : true,
      required: true
  },
  last_online:{
      type: Date,
      default: Date.now
  },
  email : {
      type: String,
      minlength:5,
      maxlength:255,
      trim : true,
      required: true
  },
  online_status:{
      type: Boolean,
      default: 0
  },
  tel : {
      type : String,
      minlength:10,
      maxlength:10,
      trim : true,
      required: true
  }
}));

function validateCustomer(customer) {
  const schema = {
    vehicle_no: Joi.string().min(5).max(7).required(),
    fname: Joi.string().min(3).max(50).required(),
    lname: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(50).required().email(),
    tel: Joi.string().min(10).max(10).required()
  };

  return Joi.validate(customer, schema);
}

exports.Customers = Customers; 
exports.validate = validateCustomer;