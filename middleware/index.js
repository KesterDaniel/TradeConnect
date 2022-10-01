const Merchant = require("../models/merchant")
const Customer = require("../models/customer")

const middlewareObj = {}

middlewareObj.IsMerchant = function(req, res, next){
    if(req.isAuthenticated() && req.user.IsMerchant){
        return next()
    }
    req.flash("error","you dont have permission for dat")
    res.redirect("back")
}

module.exports = middlewareObj