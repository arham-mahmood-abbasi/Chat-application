const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{type: String,required: true,},
    password:{type: String,required: true,},
    role: {
        type: String,
        required: true,
        enum: ['admin', 'super','user'] 
      },
      personId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
      },
},{timestamps:true});

// accessibility to other js files
module.exports = mongoose.model('User',userSchema);