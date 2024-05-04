// Inside fileUploadRouter.js

const express = require('express');
const router = express.Router();

// Import your controller function
const { handleFileUpload } = require('../Controller/fileUpload');

// Define route using multer middleware
module.exports = function(upload) {
    router.post('/upload', upload.single('file'), handleFileUpload);
    return router;
};
