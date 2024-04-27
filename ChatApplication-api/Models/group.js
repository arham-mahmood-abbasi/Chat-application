const mongoose = require('mongoose');
// const User=require('./user')

const groupSchema = mongoose.Schema({
    groupName:{type: String,required: true,},
    groupMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
    groupOwner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
      },
},{timestamps:true});

// accessibility to other js files
module.exports = mongoose.model('Group',groupSchema);