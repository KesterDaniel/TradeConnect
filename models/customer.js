const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const CustomerSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    PhoneNumber:{
        type: String,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    State:{
        type: String,
        required: true
    },
    Orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }]
})

CustomerSchema.plugin(passportLocalMongoose)
const Customer = mongoose.model("Customer", CustomerSchema)

module.exports = Customer