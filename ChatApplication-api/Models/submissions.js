const mongoose = require('mongoose');
// const User=require('./user')
const Assignment=require('./assignment')

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
    submissionDate: {type: Date,required: true,},
    submissionFile:{type: String,required: true,},
},{timestamps:true});

// accessibility to other js files
module.exports = mongoose.model('Submissions',submissionSchema); 