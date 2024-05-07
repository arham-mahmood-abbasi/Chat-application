const mongoose = require('mongoose');
// const Classroom=require('./classroom')

const assignmentSchema = mongoose.Schema({
   
    
    assignmentName:{type: String,required: true,},
    description:{type: String,required: true,},
    dueDate: {type: Date,required: true,},
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Classroom'
      },
},{timestamps:true});

// accessibility to other js files
module.exports = mongoose.model('Assignment',assignmentSchema); 