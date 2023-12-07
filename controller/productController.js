const Products = require("../model/productModel")
const utils = require("../utils/helperUtils")
const controller = {}

controller.createProducts = async(req, res)=>{

    if(!req.body.product) throw "PRODUCT_REQUIRED"
    if(!req.body.quantity) throw "QUANTITY_REQUIRED"
    if(!req.body.price) throw "PRICE_REQUIRED"

   const createProducts = await Products.create({
    productId: utils.getRandomNumber(100),
    productName:req?.body?.product,
    quantity : req?.body?.quantity,
    price:req?.body?.price,
    date: new Date()
   })

   if(createProducts){
    res.json("productCreate")
}else{
    res?.json("SOMETHING_WENT_WRONG")
}

}

module.exports = controller