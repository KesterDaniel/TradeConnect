const express = require("express")
const router = express.Router()

router.get("/", (req, res)=>{
    const customer = req.user
    res.render("home", {customer})
})

module.exports = router