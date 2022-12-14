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
            req.flash("error", "Sorry, Something went wrong")
            res.redirect("back")
        }
    }else{
        req.flash("error", "You need to be logged in as a merchant")
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
    req.flash("error", "You need to be logged in as a customer")
    res.redirect("/customer/login")
}

middlewareObj.orderPlaced = async function(req, res, next){
    const allOrders = await Order.find({})
    const userOrders = allOrders.filter((order)=>
        order.Buyer == req.user._id && order.Product == req.params.productId
    )

    if(userOrders.length === 0){
        return next()
    }
    console.log("ordeer already exists")
    req.flash("error", "You have already placed an order for this product")
    res.redirect("back")
}

middlewareObj.ownOrder = async function(req, res, next){
    if(req.isAuthenticated && req.user.isCustomer){
        const allOrders = await Order.find({})
        const userOrders = allOrders.filter((order)=>
            order.Buyer == req.user._id && order._id == req.params.orderID
        )
    
        if(userOrders.length !== 0){
            return next()
        }
        req.flash("error", "Process cant continue")
        res.redirect("back")
    }else{
        req.flash("error", "You have to be logged in as a customer")
        res.redirect("/customer/login")
    }
}
module.exports = middlewareObj