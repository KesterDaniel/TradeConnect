const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    BuyerName: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Product: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        ProductName: String
    },
    PhoneNumber: {
        type: String,
        required: true        
    }
})

const Order = mongoose.model("Order", OrderSchema)

module.exports = Order