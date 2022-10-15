const express = require("express")
const router = express.Router()
const Product = require("../models/product")
const middleware = require("../middleware/index")

router.get("/", async(req, res)=>{
    const allProducts = await Product.find({}).sort({ _id: -1 })
    res.render("home", {allProducts})
})

router.get("/logout", (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success", "Logged you out. See you next time")
        res.redirect("/")
    })
})

module.exports = router