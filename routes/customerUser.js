const express = require("express")
const router = new express.Router()
const passport = require("passport")
const Customer = require("../models/customer")
const middleware = require("../middleware/index")
const Order = require("../models/order")


router.get("/customer/signup", (req, res)=>{
    res.render("regCust")
})

router.post("/customer/signup", async(req, res)=>{
    const { username, Name, PhoneNumber, Address, State, isCustomer } = req.body
    const password = req.body.password
    
    const customer = new Customer({username, Name, PhoneNumber, Address, State, isCustomer})
    try {
        await Customer.register(customer, password)
        await passport.authenticate("CustomerLocal")(req, res, ()=>{
            req.flash("success", "Welcome to TradeCon")
            res.redirect("/")
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/customer/login", (req, res)=>{
    res.render("CustLogin")
})

router.post("/customer/login", passport.authenticate("CustomerLocal" , {
    failureRedirect: "back"
}), (req, res)=>{
    req.flash("success", "Welcome back")
    res.redirect("/")
})

router.get("/customer/:customerID/orders", middleware.IsCustomer, async(req, res)=>{
    try {
        const allorders = await Order.find({})
        const custOrders = allorders.filter((order)=>
            order.Buyer == req.params.customerID
        )
        res.render("custOrders", {custOrders})
    } catch (error) {
        console.log(error)
    }
})

router.delete("/customer/:customerID/:orderID", middleware.ownOrder, async(req, res)=>{
    try {
        await Order.findByIdAndDelete(req.params.orderID)
        req.flash("success", "You have deleted a product")
        res.redirect("back")
    } catch (error) {
        req.flash("error", "Something went wrong. Please contact support")
        res.redirect("back")
        console.log(error)
    }
})
module.exports = router