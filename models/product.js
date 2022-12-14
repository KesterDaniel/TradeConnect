const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        // required: true
    },
    Images: [{
        type: String
    }],
    
    Description: {
        type: String,
        // required: true
    },
    Category: {
        type: String,
        // required: true
    },
    Price: {
        type: Number,
        // required: true
    },
    Views: {
        type: Number,
        default: 0
    },
    Owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Merchant"
        },
        username: String
    },
    Availability: {
        type: Boolean,
        default: true
    }
})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product