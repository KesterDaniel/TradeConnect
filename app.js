const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const passport = require("passport")
// const expressSession = require("express-session")
const passportLocalMongose = require("passport-local-mongoose")
const LocalStrategy = require("passport-local")
const productRoute = require("./routes/products")
const userRoute = require("./routes/users")
const indexRoute = require("./routes/index")
const app = express()
const port = process.env.PORT

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.set("view engine", "ejs")

// app.use(productRoute)
// app.use(userRoute)
app.use(indexRoute)

app.listen(port, ()=>{
    console.log("server up")
})