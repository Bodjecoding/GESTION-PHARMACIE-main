import mongoose from "mongoose";

const userSchema = mongoose.Schema({
     firstName:{
          type: String,
          required: true
     },
     lastName: String,
     email:{
          type: String,
          required: true,
          unique: true
     },
     password: {
          type: String,
          required: true
     },
} ,{timestamps:true})

const User = mongoose.model('User',userSchema);
export default User;