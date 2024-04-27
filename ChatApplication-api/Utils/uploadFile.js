const cloudinary = require('cloudinary').v2;
const Submission = require('../models/submissions'); // Assuming this is your Submission model

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dhptugemw',
  api_key: '817194734144296',
  api_secret: '1piTjglR5jobighJv5x6ray1S3Y'
});

async function uploadFile(file, assignmentId, studentId) {
  try {
    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path);

    // Save file URL in submissions table
    const newSubmission = new Submission({
      assignmentId: assignmentId,
      studentId: studentId,
      fileUrl: result.secure_url
    });
    await newSubmission.save();

    // Return the uploaded file URL
    return result.secure_url;
  } catch (error) {
    throw new Error('An error occurred while uploading the file');
  }
}

module.exports = uploadFile;
