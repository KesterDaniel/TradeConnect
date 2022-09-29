const express = require("express")
const router = express.Router()
const passport = require("passport")
const LocalStrategy = require("passport-local")
const Merchant = require("../models/merchant")
const middleware = require("../middleware/index")

router.get("/regMerchant", (req, res)=>{
    res.render("regMerch")
})

router.post("/regMerchant", async(req, res)=>{
    const username = req.body.username
    const FirstName = req.body.Merchant.FirstName
    const LastName = req.body.Merchant.LastName
    const State = req.body.Merchant.state
    const Address = req.body.Merchant.Address
    const PhoneNumber = req.body.Merchant.PhoneNumber
    const password = req.body.password
    const merchant = new Merchant({username, FirstName, LastName, State, Address, PhoneNumber})
    try {
        await Merchant.register(merchant, password)
        await passport.authenticate("MerchantLocal")(req, res, ()=>{
            res.redirect("/merchant")
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/merchant", (req, res)=>{
    const merchant = req.user
    res.render("merchantPage", {merchant})
})






module.exports = router