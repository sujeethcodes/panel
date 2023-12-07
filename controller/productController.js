const Products = require("../model/productModel")
const utils = require("../utils/helperUtils")
const controller = {}

controller.createProducts = async(req, res)=>{

   const createProducts = await Products.create({
    productId: utils.getRandomNumber(100),
    productName:req?.body?.product,
    quantity : req?.body?.quantity,
    price:req?.body?.price,
    date: new Date()
   })

   if(createProducts){
    res.json("productCreate")
}

}

module.exports = controller