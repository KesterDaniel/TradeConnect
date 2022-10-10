const Merchant = require("../models/merchant")
const Customer = require("../models/customer")
const Product = require("../models/product")
const Order = require("../models/order")

const middlewareObj = {}

middlewareObj.checkproductOwnership = async function(req, res, next) {
    if(req.isAuthenticated() && req.user.isMerchant){
        try {
            const foundproduct = await Product.findById(req.params.productId)
            if(foundproduct.Owner.id.equals(req.user._id) ){
                next()
            
            }else{
                req.flash("error", "You don't permission to do that")
                res.redirect("back")
            }
        } catch (error) {
            req.flash("error", "Sorry, Photo not found")
            res.redirect("back")
        }
    }else{
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back")
    }
}


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

middlewareObj.orderPlaced = async function(req, res, next){
    const allOrders = await Order.find({})
    // let userOrders = [] 
    const userOrders = allOrders.filter((order)=>
        order.Buyer == req.user._id
    )

    // console.log(userOrders)

    if(userOrders.length === 0){
        return next()
    }
    console.log("ordeer already exists")
    req.flash("error", "You have alraedy placed an order for this product")
    res.redirect("back")
}
module.exports = middlewareObj