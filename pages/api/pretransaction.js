import { rejects } from 'assert';
import NextCors from 'nextjs-cors';
const https = require('https');
import Order from "../../models/Order"
import connectDb from "../../middleware/mongoose"
import User from '../../models/User';
import Products from '../../models/Products';
var jwt = require('jsonwebtoken');
/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/
const PaytmChecksum = require('paytmchecksum');
const handler = async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
    if (req.method === 'POST') {
        // Checking if cart is tampered or not
        let cart = req.body.cart;
        let sumTotal = 0,product;
        if(req.body.type === 'normal'){
            for(let item of cart){
                sumTotal+=item.price*item.qty
                product = await Products.findById(item.itemCode)
                if(product.availableQty < item.qty){
                    res.status(200).json({success:false,error:"Sorry! Some items in your cart are out of stock."})
                    return
                }
                if(product.price !== item.price){
                    res.status(200).json({success:false,error:"There is some error in the cart. Please try again"})
                    return
                }
            }
            if(sumTotal!==req.body.total){
                res.status(200).json({success:false,error:"There is some error in the cart. Please try again"})
                return
            }
        }
        else if(req.body.type === 'buynow'){
            sumTotal+=cart[0].price*cart[0].qty
            product = await Products.findById(cart[0].itemCode)
            if(product.price !== cart[0].price){
                res.status(200).json({success:false,error:"There is some error in the cart. Please try again"})
                return
            }
            if(sumTotal!==req.body.total){
                res.status(200).json({success:false,error:"There is some error in the cart. Please try again"})
                return
            }
        }

        // Save order
        var t = jwt.verify(req.body.token,process.env.JWT_SECRET)
        let user = await User.findOne({email:t.email})
        let order = new Order({
            userId: user._id,
            orderId: req.body.oid,
            orderInfo: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                products: req.body.cart,
                amount: req.body.total,
            }
        })
        await order.save();

        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.total,
                "currency": "INR",
            },
            "userInfo": {
                "custId": user._id,
            },
        };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */
        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY)

            paytmParams.head = {
                "signature": checksum
            };

            var post_data = JSON.stringify(paytmParams);

            const requestAsync = async ()=>{
                return new Promise((resolve, reject)=>{
                    try {
                        
                    var options = {

                        /* for Staging */
                        hostname: 'securegw-stage.paytm.in',
        
                        /* for Production */
                        // hostname: 'securegw.paytm.in',
        
                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };
        
                    var response = "";
                    var post_req = https.request(options, function (post_res) {
                        post_res.on('data', function (chunk) {
                            response += chunk;
                        });
        
                        post_res.on('end', function () {
                            // console.log('Response: ', response);
                            let ress = JSON.parse(response).body
                            ress.success = true
                            resolve(ress)
                        });
                    });
        
                    post_req.write(post_data);
                    post_req.end();
                } catch (error) {
                    console.log(error);
                }
                })
            }
            let myr = await requestAsync();
            res.status(200).json(myr)
            

    }
}
export default connectDb(handler)