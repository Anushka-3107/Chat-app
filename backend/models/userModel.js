const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique:true
   },
  password: { type: String, required: true },
  img: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  },
}, {timestamps:true});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}


// before saving the password to database this will encrypt the password
UserSchema.pre('save', async function (next) {
  if(!this.isModified){
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt);
})


const User = mongoose.model('User', UserSchema);

module.exports = User;