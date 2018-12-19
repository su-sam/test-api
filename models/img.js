const Joi = require('joi');
const mongoose = require('mongoose');

const Imgs = mongoose.model('Imgs', new mongoose.Schema({
  upload_date : {
      type: Date,
      default: Date.now
  },
  img_type : {
      type : Boolean,
      default : false
  },
  img_url : {
    type : String,
    minlength : 5,
    maxlength : 255,
    trim : true,
    required : true
  },
  customer_id :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Customers",
    trim : true,
    required : true
  },
  img_tx_id :{
      type : String,
      minlength : 64,
      maxlength : 64,
      trim : true,
      required : true
  }
}));

function validateImgs(img) {
  const schema = {
    img_type: Joi.boolean(),
    img_url : Joi.string().min(5).max(255).required(),
    customer_id : Joi.objectId().required(),
    img_tx_id: Joi.string().min(64).max(64).required()
  };

  return Joi.validate(img, schema);
}

exports.Imgs = Imgs; 
exports.validate = validateImgs;