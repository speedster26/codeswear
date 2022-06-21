import mongoose, { models } from 'mongoose';
const { Schema , model } = mongoose;

const ProductSchema = new Schema({
  title: {type: String, required:true},
  slug: {type: String, required:true, unique:true},
  desc: {type: String, required:true},
  img: {type: String, required:true},
  category: {type: String, required:true},
  size: {type: String},
  colour: {type: String},
  price: {type: Number, required:true},
  availableQty: {type: Number, required:true}
  
},{timestamps:true});

export default models.Product || model("Product", ProductSchema);