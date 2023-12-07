const User = require("../model/userModel")
const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");
const handler = require("express-async-handler")
const utils = require("../utils/helperUtils");
const authUtils = require("../utils/authUtils");
const controller = {}
const session = {}

controller.userCreate = handler(async(req, res)=>{
        if(!req?.body?.name) throw "USERNAME_REQURIED"
        if(!req?.body?.email) throw "EMAIL_REQURIED"
        if(!req?.body?.password) throw "PASSWORD_REQURIED"
        

const verifyUser = await User.findOne({
    where:{
        email:req?.body?.email
    }
})
if(verifyUser) throw "THIS_EMAIL_ID_ALREADY_HAVE_A_ACCOUNT"

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req?.body?.password, salt);

           const userCreate = await User.create({
               userId:utils.getRandomNumber(16),
               name:req?.body?.name,
               email:req?.body?.email,
               password:password,
               date:new Date()
        
           })
           if(req?.body?.admin){
            userCreate.admin=req?.body?.admin
            await userCreate.save()
           }

           if (userCreate) {
            const userDetails = await User.findOne({
                where: {
                    userId: userCreate?.userId,
                },
            });
        
            if (userDetails) {
                userDetails.token = authUtils?.tokenGenerate(userDetails?.userId);
                await userDetails.save();
            }
        
            res.json({message:"CREATED_SUCCESSFULLY"});
        }else{
            res?.json({message:"SOMETHING_WENT_WRONG"})
        }
        
        }) 
        

controller.editUser = handler(async(req, res)=>{
    const editUser  = await User.findOne({  
        where:{
            userId:req?.body?.userId
        }
    })
    if(!editUser) throw "SOMETHING_WENT_WRONG"

    if(req?.body?.name){
        editUser.name = req?.body?.name
    }
    if(req?.body?.email){
        editUser.email = req?.body?.email
    }
    if(req?.body?.password){
        editUser.password=req?.body?.password
    }
    await editUser.save()
    res.json({status:200, message:"EDIT_SUCCESSFULLY"})
})

controller.deleteUser = handler(async(req,res)=>{
    const deleteUser = await User.destroy({
        where:{
            email:req?.body?.email
        }
    })
 
    if(deleteUser){
      return  res.json("YOUR_ACCOUNT_DELETED")
    }else{
        return  res.json("SOMETHING_WENT_WRONG")
    }
})

controller.userLogin = handler(async(req, res)=>{
const sessionId = uuid()

if(!req?.body?.email) throw "EMAIL_REQUIRED"
if(!req?.body?.password) throw "PASSWORD_REQUIRED"

    const verifyUser = await User.findOne({
        where:{
            email:req?.body?.email
        }
    })
    if(verifyUser){
        await bcrypt.compare(req?.body?.password, verifyUser?.password).then((match) => {

            if(match){
                session[sessionId] = {name:verifyUser?.name, email:verifyUser?.email}
                res.set(`Set-Cookie`,`sessionId=${verifyUser?.token}`)
                res.json({message:"success"})
            }else{
                res.json("EMAIL_OR_PASSWORD_WRONG")
            }
        })
    }else{
        res?.json({message:"INVAILD_USER"})
    }

})

controller.logOut = handler(async(req, res)=>{
    const sessionId = req.headers.cookie?.split("=")[1];
    delete session[sessionId]
    res.set("Set-Cookie", "session=");
    return res.json({message:"LOGOUT_SUCCESSFULLY"})
})
module.exports = controller

