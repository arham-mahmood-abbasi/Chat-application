const mongoose = require('mongoose');
// const User=require('./user')

const personSchema = mongoose.Schema({
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    personName: {type: String,required: true},
    profilePicUrl: {type: String},
    gender: {
        type: String,
        enum: ['male', 'female','Not to say'] 
      }
},{timestamps:true});

// accessibility to other js files
module.exports = mongoose.model('Person',personSchema);