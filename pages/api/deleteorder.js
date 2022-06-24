// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "../../models/Order"
import connectDb from "../../middleware/mongoose"
import NextCors from 'nextjs-cors';
import Products from "../../models/Products";
import PaytmChecksum from "paytmchecksum";

const handler = async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    await Order.findOneAndDelete({orderId:{$eq:req.body.toString()}})
    res.status(200).json({succes:true})
}
export default connectDb(handler)
