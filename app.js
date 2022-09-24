const express = require("express")
const app = express()
const port = process.env.PORT

app.get("/", (req, res)=>{
    res.send("Welcome to TradeConnect")
})

app.listen(port, ()=>{
    console.log("server up")
})