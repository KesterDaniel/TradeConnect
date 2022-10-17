const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const passport = require("passport")
const flash = require("connect-flash")
const expressSession = require("express-session")
const passportLocalMongose = require("passport-local-mongoose")
const LocalStrategy = require("passport-local")
const CustomerRoute = require("./routes/customerUser")
const productRoute = require("./routes/products")
const merchantRoute = require("./routes/merchantUser")
const indexRoute = require("./routes/index")
const Merchant = require("./models/merchant")
const Customer = require("./models/customer")
const { promiseImpl } = require("ejs")
const app = express()
const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true
})

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.set("view engine", "ejs")



app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})

passport.use("MerchantLocal", new LocalStrategy(Merchant.authenticate()))
passport.use("CustomerLocal", new LocalStrategy(Customer.authenticate()))



passport.serializeUser(function(user, done) { 
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
if(user!=null)
    done(null,user);
});
app.use(productRoute)
app.use(CustomerRoute)
app.use(indexRoute)
app.use(merchantRoute)

app.listen(port, ()=>{
    console.log("server up")
})

