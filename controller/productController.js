const handler = require("express-async-handler")
const Products = require("../model/productModel")
const utils = require("../utils/helperUtils")
const controller = {}

controller.createProducts = handler(async(req, res)=>{

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

})

controller.editProducts = handler(async(req, res)=>{
        const checkProduct = await Products.findOne({
            where:{
                productId:req?.body?.productId
            }
        })
        if(!checkProduct) throw "INVAILD_PRODUCT"
        
        if(req?.body?.productName){
            checkProduct.productName = req?.body?.productName
        }
        if(req?.body?.quantity){
            checkProduct.quantity = req?.body?.quantity
        }
        if(req?.body?.price){
            checkProduct.price = req?.body?.price
        }
        await checkProduct.save()
        res?.json({message:"EDITED"})
})


controller.deleteProduct = handler(async(req, res)=>{
    if(!req?.body?.productId) throw "PRODUCT_ID_REQUIRED"
    
        const checkProduct = await Products.findOne({
            where:{
                productId:req?.body?.productId
            }
        })
        if(!checkProduct) throw "INVAILD_PRODUCT"
        
        const deleteProduct = await Products.destroy({
            where:{
                productId:checkProduct?.productId
            }
        })
        if(!deleteProduct) throw "SOMETHING_WENT_WRONG"
        res.json({message:"PRODUCT_DELETED"})
})

controller.viewProduct = handler(async(req, res)=>{
    if(req?.body?.productName){
        const product = await Products.findAll({
            where:{
                productName:req?.body?.productName
            }
        })
        res?.json(product)
    }else{
        const viewProduct = await Products.findAll({
            order:[["id","DESC"]]
        })
    if(viewProduct){
        res.json(viewProduct)
    }
    }
    
   
   
})

module.exports = controller