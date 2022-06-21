// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Products from "../../models/Products"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {

    try {
        if (req.method == 'PUT') {
            for (let i = 0; i < req.body.length; i++) {
                let p = await Products.findByIdAndUpdate(req.body[i]._id,req.body[i])
            }
            res.status(200).json({ success: true})
        }
        else {
            res.status(400).json({ success: false, error: "This method is not allowed" })
        }
    } catch (error) {
        res.status(500).json({success: false,error})
        console.log(error);
    }
}
export default connectDb(handler)