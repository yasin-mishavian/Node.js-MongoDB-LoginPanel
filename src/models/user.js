const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

// unique:منحصر بفرد باشه و مثلش نباشه
const userSchema = new mongoose.Schema({
  email : { type: String , required: true , unique:true },
  name : { type: String , required: true , unique:true },
  password : { type: String , required: true , unique:true },
  isadmin : { type: Boolean, default:false },
})

userSchema.plugin(timestamp);

const User = mongoose.model("User" , userSchema ) ;

module.exports = User ;