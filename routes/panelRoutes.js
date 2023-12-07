const express = require("express")
const router = express.Router()
const  verifyAdmin  = require("../middleware/adminVerify")
const {verifyToken} = require("../utils/authUtils")
const userController = require("../controller/loginController")
const productController = require("../controller/productController") 
// USER CONTROLLER ROUTES
router.post("/userCreate", userController.userCreate)
router.post("/editUser",verifyToken, userController.editUser)
router.post("/deleteUser", verifyToken,userController.deleteUser)
router.post("/userLogin",verifyToken, userController.userLogin)
router.post("/userLogOut", verifyToken,userController.logOut)


// PRODUCT CONTROLLER ROUTES
router.post("/createProduct",verifyToken,verifyAdmin,productController.createProducts)

module.exports = router