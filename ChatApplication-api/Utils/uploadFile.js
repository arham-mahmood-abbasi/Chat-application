const Submission = require('../models/submissions'); // Assuming this is your Submission model
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination where files will be stored
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Generate unique file name
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Function to upload a file using Multer
async function uploadFile(file, assignmentId, studentId) {
  // Initialize Multer with the configured options
  const upload = multer({ storage: storage }).single('file');
  try {
    // Save file URL in submissions table
    const newSubmission = new Submission({
      assignmentId: assignmentId,
      studentId: studentId,
      fileUrl: upload.file.path
    });
    await newSubmission.save();

    // Return the uploaded file URL
    return upload.file.path;
  } catch (error) {
    throw new Error('An error occurred while uploading the file');
  }

  
};

module.exports = uploadFile;


