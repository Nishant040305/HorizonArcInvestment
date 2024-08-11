const AdminController = require('../controller/AdminController');
const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const router = express.Router();

// Multer middleware to handle file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/upload',upload.single('file'),AdminController.ImageUpload);
router.post('/landUpload',AdminController.InsertBuyLand);
router.post('/sharesUpload',AdminController.InsertStock);
module.exports = router;