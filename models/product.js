const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true
    },
    ImageOne: {
        type: String,
        required: true
    },
    ImageTwo: {
        type: String,
        required: true
    },
    ImageThree: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Views: {
        type: Number
    },
    Owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Merchant"
    }
})

ProductSchema.plugin(passportLocalMongoose)
const Product = mongoose.model("Product", ProductSchema)

module.exports = Product