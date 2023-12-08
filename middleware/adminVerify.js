const User = require("../model/userModel")
const constantUtils = require("../utils/constantUtils")

const adminVerify = async(req,res, next)=>{
    const sessionId = req.headers.cookie?.split("=")[2];
    const verify = await User.findOne({
        where : {
            token:sessionId
        }
    })
    if(verify?.admin === constantUtils.ADMIN){
        next()
    }else{
       return res.json("ACCESS_DENIED")
    }
}
module.exports = adminVerify

