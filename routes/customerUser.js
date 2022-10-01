const express = require("express")
const router = new express.Router()
const passport = require("passport")
const Customer = require("../models/customer")


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

module.exports = router