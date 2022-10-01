const express = require("express")
const router = express.Router()
const Product = require("../models/product")
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const middleware = require("../middleware/index")


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
        }, // supports promises as well
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
            product.Owner.id = currentUser.id
            await product.save();
            console.log("added new product")
            return res.status(201).redirect("back");          
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router