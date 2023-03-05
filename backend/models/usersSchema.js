const mongoose = require("mongoose");
const bcrypt=require('bcrypt')

const usersSchema = new mongoose.Schema({
  email: { required: true, unique: true, type: String },
  password: { required: true, type: String },
  firstName: { type: String },
  lastName: { type: String },
  age:{ type: Number },
  City: { type: String },
  phoneNumber: { required: true, type: Number },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "role" },
});
usersSchema.pre('save', async function(){
  this.email=this.email.toLowerCase()
  this.password= await bcrypt.hash(this.password,5)
  
})

module.exports = mongoose.model("User", usersSchema);
 
