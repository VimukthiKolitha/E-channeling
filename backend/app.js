require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const blogRoute = require("./Route/BlogwriterRoute");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const BlogwriterModel = require("./Model/BlogwriterModel"); // Import the Image Model

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/blogwriter", blogRoute);

// Serve uploaded images as static files
app.use("/files", express.static(path.join(__dirname, "uploads")));

// Database connection
mongoose.connect(process.env.Blog_DB)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => {
            console.log("Server started on port 5000");
        });
    })
    .catch((err) => console.log("Database Connection Error:", err));

// Multer storage configuration
const storageimg = multer.diskStorage({
    destination: function(req, file, cb) { 
        cb(null, path.join(__dirname, "uploads")); // Save images in 'uploads' folder
    },
    filename: function(req, file, cb) { 
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + "-" + file.originalname); // Unique filename
    }
});

// Upload image
const upload = multer({ storage: storageimg }); 

app.post("/uploadImg", upload.single("image"), async (req, res) => {
    console.log(req.body);
    console.log(req.file); // Debugging: Check uploaded file

    if (!req.file) {
        return res.status(400).json({ status: "error", message: "No file uploaded" });
    }

    const { Id, Title, Description, Email } = req.body; // Extract blog data from request
    const imageName = req.file.filename; // Get the uploaded image filename

    try {
        // Save blog post along with the image
        const newBlog = await BlogwriterModel.create({
            Id,
            Title,
            Description,
            Email,
            Image: imageName, // Store the image filename in the blog post
        });

        res.json({ status: "ok", message: "Blog with image uploaded successfully!", data: newBlog });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});


// Display images
app.get("/getImage", async (req, res) => {
    try {
        const blogsWithImages = await BlogwriterModel.find({}).select("Id Title Description Email Image");
        res.json({ status: "ok", data: blogsWithImages });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});
