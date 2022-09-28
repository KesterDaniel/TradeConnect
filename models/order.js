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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    PhoneNumber: {
        type: String,
        required: true        
    }
})

const Order = mongoose.model("Order", OrderSchema)

module.exports = Order