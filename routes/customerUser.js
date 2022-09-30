const express = require("express")
const router = new express.Router()
const passport = require("passport")
const Customer = require("../models/customer")


router.get("/customer/signup", (req, res)=>{
    res.render("regCust")
})

router.post("/customer/signup", async(req, res)=>{
    const { username, Name, PhoneNumber, Address, State } = req.body
    const password = req.body.password
    
    const customer = new Customer({username, Name, PhoneNumber, Address, State})
    try {
        await Customer.register(customer, password)
        await passport.authenticate("CustomerLocal")(req, res, ()=>{
            res.redirect("/")
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router