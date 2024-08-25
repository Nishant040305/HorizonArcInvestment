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
router.post('/getNotificationAdmin',AdminController.NotificationGet);
router.put('/lands/:id', AdminController.UpdateLand);
router.get('/lands/:id',AdminController.getLandInfo);
router.delete('/land/:id/:type',AdminController.DeleteLand);
router.post('/register',[body('email').isEmail()],credController.createAdmin)
module.exports = router;