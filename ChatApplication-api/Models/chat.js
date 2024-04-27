const mongoose = require('mongoose');
// const User=require('./user')

const chatSchema = mongoose.Schema({
    message:{type: String,required: true,},
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
},{timestamps:true});

// accessibility to other js files
module.exports = mongoose.model('Chat',chatSchema);