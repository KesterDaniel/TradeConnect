const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const validator = require("validator")
const MerchantSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        // required: true
    },
    LastName: {
        type: String,
    },
    Email: {
        type: String,
    },
    username: {
        type: String
    },
    State: {
        type: String,
        // required: true
    },
    Address: {
        type: String,
        // required: true
    },
    PhoneNumber: {
        type: String,
        // required: true
    },
    DisplayPic: {
        type: String,
        // required: true
    },
    Password: {
        type: String,
        // required: true
    },
    isMerchant: {
        type: Boolean
    },
    // Messages: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Message"
    // }], 
    // Orders: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Order"
    // }]
})

MerchantSchema.plugin(passportLocalMongoose)
const Merchant = mongoose.model("Merchant", MerchantSchema)

module.exports = Merchant