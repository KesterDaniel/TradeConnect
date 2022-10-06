const express = require("express")
const router = express.Router()
const passport = require("passport")
const LocalStrategy = require("passport-local")
const Merchant = require("../models/merchant")
const middleware = require("../middleware/index")
const Product = require("../models/product")

router.get("/merchant/signup", (req, res)=>{
    res.render("regMerch")
})

router.post("/merchant/signup", async(req, res)=>{
    const {username, FirstName, LastName, State, Address, PhoneNumber, isMerchant} = req.body
    const password = req.body.password
    const merchant = new Merchant({username, FirstName, LastName, State, Address, PhoneNumber, isMerchant})
    try {
        await Merchant.register(merchant, password)
        await passport.authenticate("MerchantLocal")(req, res, ()=>{
            res.redirect("/merchant")
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/merchant", middleware.IsMerchant, async(req, res)=>{
    const allProducts = await Product.find({})
    const ownedProducts = allProducts.filter((product)=>
        product.Owner.username == req.user.username
    )
    res.render("merchantPage", { ownedProducts })
})

router.get("/merchant/login", (req, res)=>{
    res.render("MerchLogin")
})

router.post("/merchant/login", passport.authenticate("MerchantLocal", {
    failureRedirect: "/merchant/login"
}), (req, res)=>{
    res.redirect("/merchant")
})





module.exports = router