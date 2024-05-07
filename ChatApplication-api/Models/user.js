const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{type: String},
    password:{type: String},
    verified: {type: Boolean}
},{timestamps:true});

// accessibility to other js files
module.exports = mongoose.model('User',userSchema);