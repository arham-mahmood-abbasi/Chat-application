const express = require('express');
const router = express.Router();
const fileUploadController = require('../Controller/fileUpload');

router.post('/upload',fileUploadController.handleFileUpload);
module.exports=router;