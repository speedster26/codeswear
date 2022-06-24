import mongoose, { models } from 'mongoose';
const { Schema , model } = mongoose;

const OrderSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, required:true},
  orderId: {type: String, required:true},
  orderInfo: {
    name: {type: String, required:true},
    email: {type: String, required:true},
    phone: {type: Number, required:true},
    address: {type: String, required:true},
    products: {type: Object, required:true},
    amount: {type: Number, required:true},
    status: {type: String, default:'Pending', required:true},
    delivery: {type: String, default:'Pending', required:true}
  },
  paymentInfo: {type: Object, default:{}}
  
},{timestamps:true});
export default models.Order || model("Order", OrderSchema);