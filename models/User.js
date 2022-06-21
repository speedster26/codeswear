import mongoose, { models } from 'mongoose';
const { Schema , model } = mongoose;

const UserSchema = new Schema({
  name: {type: String, required:true},
  email: {type: String, required:true, unique:true},
  password: {type: String, required:true}
  
},{timestamps:true});

export default models.User || model("User", UserSchema);