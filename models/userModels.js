import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 

//schema
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"name is required"]
        
    },
    lastname:{
        type:String,
        required:[true,"lastname is required"]
    },


    email: {
        type:String,
        required:[true,"email is required"],
        unique:true,
        validator:validator.isEmail

    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    location:{
        type:String,
        required:[true,"location is required"],
        default:"India"

    },

},
  {timestamps:true})

//middleware
userSchema.pre("save", async function () {
    
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//jsonwebtoken
userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};


export default mongoose.model("User", userSchema);