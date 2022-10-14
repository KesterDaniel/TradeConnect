const express = require("express")
const router = new express.Router()
const passport = require("passport")
const Customer = require("../models/customer")
const middleware = require("../middleware/index")
const Order = require("../models/order")
const Merchant = require("../models/merchant")
const message = require("../afterware/messaging")

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
        const order = await Order.findById(req.params.orderID)
        const merchantID = order.Merchant
        const merchant = await Merchant.findById(merchantID)
        const customer = await Customer.findById(req.params.customerID)
        const msg = `
        <p>The order placed by ${customer.Name} for the item below has been cancelled by the user </p>
        <p>Product Name: ${order.ProductName}</p>
        <img src="${order.ProductImage}">
        `
        await Order.findByIdAndDelete(req.params.orderID)
        message("Order Cancelled", merchant.Email, msg)
        req.flash("success", "You have deleted an order")
        res.redirect("back")
    } catch (error) {
        req.flash("error", "Something went wrong. Please contact support")
        res.redirect("back")
        console.log(error)
    }
})
module.exports = router