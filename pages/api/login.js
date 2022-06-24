// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {

    try {
        if (req.method == 'POST') {
            let user = await User.findOne({"email": req.body.email})
            if(user){
                let bytes  = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
                let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
                if(req.body.email === user.email && req.body.password === decryptedPass){
                    var token = jwt.sign({ name:user.name , email:user.email  }, process.env.JWT_SECRET, {expiresIn: '1d'});
                    res.status(200).json({ success: true , token})
                }
                else{
                    res.status(200).json({ success: false , error:"Invalid credentials"})
                }
            }
            else{
                res.status(200).json({ success: false , error:"Invalid credentials"})
            }
        }
        else {
            res.status(400).json({ success: false, error: "This method is not allowed" })
        }
    } catch (error) {
        res.status(500).json({success: false,error})
    }
}
export default connectDb(handler)