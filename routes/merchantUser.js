const express = require("express")
const router = express.Router()
const passport = require("passport")
const LocalStrategy = require("passport-local")
const validator = require("validator")
const Merchant = require("../models/merchant")
const middleware = require("../middleware/index")
const Product = require("../models/product")
const { route } = require("./products")
const Order = require("../models/order")

router.get("/merchant/signup", (req, res)=>{
    res.render("regMerch")
})

router.post("/merchant/signup", async(req, res)=>{
    const {username, FirstName, LastName, State, Address, PhoneNumber, isMerchant, Email} = req.body
    const password = req.body.password
    if(!validator.isEmail(Email)){
        req.flash("error", "please enter a valid email address")
        return res.redirect("back")
    }
    const merchant = new Merchant({username, FirstName, LastName, State, Address, PhoneNumber, isMerchant, Email})
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

router.get("/merchant/:MerchantId/orders", async(req, res)=>{
    try {
        const merchant = await Merchant.findById(req.params.MerchantId)
        const orders = await merchant.populate("Orders")
        const hisOrders = orders.Orders
        console.log(hisOrders)
        // const merchOrders = merchant.Orders
        // const allOrders = []
        // merchOrders.forEach(async(order)=>{
        //    const theOrder = await Order.findById(order._id)
        //    allOrders.push(theOrder)
        // })
        // console.log(allOrders)
    } catch (error) {
        console.log(error)
    }
})




module.exports = router