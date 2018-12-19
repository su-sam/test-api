const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

// const PasswordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        minlength:5,
        maxlength:255,
        trim : true,
        unique : true,
        required: true
    },
    password : {
        type: String,
        minlength:5,
        maxlength:1024,
        trim : true,
        required: true
    }
});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id:this._id}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;