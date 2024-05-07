const mongoose = require('mongoose');
// const User=require('./user')

const submissionSchema = mongoose.Schema({
    assignmentId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Assignment'
      },
    studentId:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'User'
    },
    submissionFile:{type: String,required: true,},
},{timestamps:true});

// accessibility to other js files
module.exports = mongoose.model('Submissions',submissionSchema); 