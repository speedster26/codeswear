// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Products from "../../models/Products"
import connectDb from "../../middleware/mongoose"

const handler = async (req,res) => {
    let products = await Products.find()
    let tshirts = {}
    for(let item of products){
        if(item.title in tshirts){
            if(!tshirts[item.title].colour.includes(item.colour) && item.availableQty > 0){
                tshirts[item.title].colour.push(item.colour)
            }
            if(!tshirts[item.title].size.includes(item.size) && item.availableQty > 0){
                tshirts[item.title].size.push(item.size)
            }
        }
        else{
            tshirts[item.title] = JSON.parse(JSON.stringify(item))
            if(item.availableQty > 0){
                tshirts[item.title].colour = [item.colour]
                tshirts[item.title].size = [item.size]
            }
        }
    }
    res.status(200).json({tshirts})
}
export default connectDb(handler)