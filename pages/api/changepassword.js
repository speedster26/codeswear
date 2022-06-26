// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            let userData = jwt.verify(req.body.token,process.env.JWT_SECRET)
            let user = await User.findOne({"email": userData.email})
            if(user){
                let bytes  = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
                let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
                console.log(decryptedPass);
                if(req.body.npassword !== req.body.cnpassword){
                    res.status(200).json({ success: false , error:"Cannot confirm password"})
                    return
                }
                if(req.body.curpassword !== decryptedPass){
                    res.status(200).json({ success: false , error:"Invalid Password"})
                    return
                }
                if(req.body.npassword === req.body.cnpassword && req.body.curpassword === decryptedPass){
                    let password = CryptoJS.AES.encrypt(req.body.npassword, process.env.AES_SECRET).toString()
                    let a = await User.findOneAndUpdate({"email":userData.email}, {"password":password})
                    res.status(200).json({ success: true })
                }
                else{
                    res.status(200).json({ success: false , error:"Invalid credentials"})
                }
            }
            else{
                res.status(200).json({ success: false , error:"Invalid User"})
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