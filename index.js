require("dotenv").config();
const express = require("express");
const app = express()
app.use(express.json({ limit: "10000000mb" }));
// app.use(express.urlencoded({ limit: "1000000mb", extended: true }));

app.use("/api",require("./router"))

// app.post("/test",async(req, res)=>{
//    await res.json("working")
// })
const DB = require("./model/index")

const PORT = 9000
app.listen(PORT,()=>{
    console.log(`This port is Running in ${PORT}`)
})

