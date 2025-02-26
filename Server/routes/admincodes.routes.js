const express = require("express");
const { 
    uploadAdminCode, 
    getAdminCodes, 
    editAdminCode, 
    deleteAdminCode 
} = require("../controllers/admincode.Controllers");
const checkAdminAuth = require("../middlewares/adminAuth");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");

const router = express.Router();

// Multer Storage Configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (file.mimetype.startsWith("video/")) {
            return {
                folder: "admin_codes/videos",
                resource_type: "video", // Explicitly set as video for proper Cloudinary handling
            };
        }
        if (file.mimetype.startsWith("image/")) {
            return {
                folder: "admin_codes/images",
                resource_type: "image",
            };
        }
        throw new Error("Unsupported file type"); // Reject unsupported file types
    },
});

// Multer Upload Middleware
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "video/mp4", "video/mkv"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported file type"));
        }
    },
});

// Route Definitions
router.post(
    "/upload", 
    checkAdminAuth, 
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "video", maxCount: 1 }
    ]), 
    uploadAdminCode
);

router.get("/codes", getAdminCodes);

router.post(
    "/edit/:id", 
    checkAdminAuth, 
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "video", maxCount: 1 }
    ]), 
    editAdminCode
);

router.delete("/delete/:id", checkAdminAuth, deleteAdminCode);

module.exports = router;
