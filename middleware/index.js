const Merchant = require("../models/merchant")
const Customer = require("../models/customer")

const middlewareObj = {}

middlewareObj.IsMerchant = function(req, res, next){
    if(req.isAuthenticated() && req.user.isMerchant){
        return next()
    }
    req.flash("error","you dont have permission for dat")
    res.redirect("back")
}

middlewareObj.IsCustomer = function(req, res, next){
    if(req.isAuthenticated() && req.user.isCustomer){
        return next()
    }
    req.flash("error", "You need to be logged in first")
    res.redirect("/customer/login")
}

module.exports = middlewareObj