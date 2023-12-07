const express = require("express")
const router = express.Router()

const panel = require("./routes/panelRoutes")

router.use("/panel", panel)
module.exports = router