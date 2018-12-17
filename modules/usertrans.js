const Joi = require('joi');

function validateUserTrans(user) {
    const schema = {
      trans_id: Joi.string()
    };
  
    return Joi.validate(user, schema);
  }
 
  exports.validate = validateUserTrans;