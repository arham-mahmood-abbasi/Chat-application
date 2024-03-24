const mongoose = require('mongoose');
const User=require('./user')

const personSchema = mongoose.Schema({
    firstName:{type: String,required: true,},
    lastName:String,
    profilePicUrl:String,
    
    email:{type: String,required: true,},
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female','Not to say'] 
      }
},{timestamps:true});

// accessibility to other js files
module.exports = mongoose.model('Person',personSchema);