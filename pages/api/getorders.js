// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose"
import NextCors from 'nextjs-cors';
import Order from "../../models/Order";
import User from "../../models/User";
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  // Validate paytm checksum - [Pending]
  // Update order status in db
  if(req.method==="POST"){
    let orders = []
    if (req.body.token) {
        var t = jwt.verify(req.body.token, process.env.JWT_SECRET)
        let user = await User.findOne({ email: t.email })
        orders = await Order.find({ userId: user._id })
        res.status(200).json({orders})
    }
  }
  // Update status into orders tables
}
export default connectDb(handler)
