const mongoose = require('mongoose');
// const User=require('./user')

const classSchema = mongoose.Schema({
    className:{type: String,required: true,},
    classMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
      },
},{timestamps:true});

// accessibility to other js files
module.exports = mongoose.model('Classroom',classSchema); 