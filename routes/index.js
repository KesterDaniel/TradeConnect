const express = require("express")
const router = express.Router()

router.get("/", (req, res)=>{
    const customer = req.user
    res.render("home")
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