const uploadFile = require('../Utils/uploadFile');

// Controller function for handling file upload
async function handleFileUpload(req, res) {
  try {
    const file = req.file;
    const assignmentId = req.body.assignmentId;
    const studentId = req.body.studentId;

    if (!file || !assignmentId || !studentId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const fileUrl = await uploadFile(file, assignmentId, studentId);

    res.status(200).json({ message: 'File uploaded successfully', fileUrl: fileUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { handleFileUpload };
