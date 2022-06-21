import mongoose, { models } from 'mongoose';
const { Schema , model } = mongoose;

const OrderSchema = new Schema({
  userId: {type: String, required:true},
  products: [{
      productId:{type:String},
      quantity:{type:String, default: 1}
    }],
  address: {type: String, required:true},
  amount: {type: Number, required:true},
  status: {type: String, default:'Pending', required:true}
  
},{timestamps:true});

export default models.Order || model("Order", OrderSchema);