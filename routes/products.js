const express = require("express")
const router = express.Router()
const Product = require("../models/product")
const Order = require("../models/order")
const Merchant = require("../models/merchant")
const Customer = require("../models/customer")
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const middleware = require("../middleware/index")
const { application } = require("express")


cloudinary.config({
    cloud_name: 'do1xoszkp',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Products",
        format: async (req, file) => {
            "jpg", "png";
        }, 
        public_id: (req, file) => {
            console.log(
                new Date().toISOString().replace(/:/g, "-") + file.originalname
            );
            return (
                new Date().toISOString().replace(/:/g, "-") + file.originalname
            );
        },
    },
});

const parser = multer({ storage: storage });

router.get("/addProduct", middleware.IsMerchant, (req, res)=>{
    res.render("addproduct")
})

router.post("/addProduct", middleware.IsMerchant, parser.array("Images", 3), async(req, res)=>{
    const { ProductName, Description, Category, Price} = req.body
    try {
        let product = new Product({
            ProductName,
            Description,
            Category,
            Price
        })
        if (req.files) { // if you are adding multiple files at a go
            const imageURIs = []; // array to hold the image urls
            const files = req.files; // array of images
            for (const file of files) {
                const { path } = file;
                imageURIs.push(path);
            };
            product['Images'] = imageURIs;
            product.Owner.id = req.user._id
            product.Owner.username = req.user.username
            await product.save();
            console.log("added new product")
            req.flash("success", "You did it")
            res.status(201).redirect("back"); 
        }
    } catch (error) {
        console.log(error)
        // req.flash("error", "Something went wrong. Please check your connection and try again")
        // res.redirect("back")
    }
})

router.get("/product/:productId/", async(req, res)=>{
    const product = await Product.findById(req.params.productId)
    product.Views += 1
    await product.save()
    res.render("viewproduct", {product})
})

router.post("/product/:productId/order", middleware.IsCustomer, async(req, res)=>{
    const product = await Product.findById(req.params.productId)
    const OwnerId = product.Owner.id
    const productOwner = await Merchant.findById(OwnerId)
    const Buyer = await Customer.findById(req.user._id)
    try {
        const newOrder = await Order.create({
            BuyerName: Buyer.Name,
            Address: Buyer.Address,
            PhoneNumber: Buyer.PhoneNumber,
            Product: req.params.productId
        })
        await newOrder.save()
        await Buyer.Orders.push(newOrder)
        await Buyer.save()
        await productOwner.Orders.push(newOrder)
        await productOwner.save()
        req.flash("success", "You have successfully place an order for this product. You will be contacted by the merchant.")
        res.redirect("back")
    } catch (error) {
        console.log(error)
    }
})

router.get("/product/:productId/edit", middleware.checkproductOwnership, async(req, res)=>{
    const product = await Product.findById(req.params.productId)
    res.render("productEditForm", {product})
})

router.put("/product/:productId/edit", middleware.checkproductOwnership, async(req, res)=>{
    try {
        await Product.findByIdAndUpdate(req.params.productId, req.body.product)
        res.redirect("/merchant")
    } catch (error) {
        req.flash("error", "Something went wrong. Please try again")
        res.redirect("back")
    }
})

router.delete("/product/:productId", middleware.checkproductOwnership, async(req, res)=>{
    try {
        await Product.findByIdAndDelete(req.params.productId)
        req.flash("success", "Deleted product")
        res.redirect("back")
    } catch (error) {
        console.log(error)
    }
})
module.exports = router