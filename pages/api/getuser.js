// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose"
import NextCors from 'nextjs-cors';
import User from "../../models/User";
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  try {
    if(req.method==="POST"){
        if (req.body.token) {
            var t = jwt.verify(req.body.token, process.env.JWT_SECRET)
            let user = await User.findOne({ email: t.email },{password:0})
            res.status(200).json({success:true,user})
        }
      }
  } catch (error) {
    res.status(200).json({success:true,error})
  }
  // Update order status in db
  
  // Update status into orders tables
}
export default connectDb(handler)
