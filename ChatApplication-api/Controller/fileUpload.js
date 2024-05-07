const Upload = require('../Utils/upload');
const Submission =  require('../Models/submissions')

// Controller function for handling file upload
async function handleFileUpload(req, res) 
{
  console.log(req.file)
  try {
    const file = req.file;
    const assignmentId = req.body.assignmentId;
    const studentId = req.body.studentId;

    if (!file || !assignmentId || !studentId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    const upload = await Upload.uploadFile(req.file.path);
    // const fileUrl = await uploadFile(file, assignmentId, studentId);
    console.log(upload)
    var submission = new Submission({
      submissionFile:upload.secure_url,
      assignmentId:assignmentId,
      studentId:studentId
    });
    var record = await submission.save();
    res.send({ succes:true, msg:'File Uploaded Successfully!', data:record });
  }
   catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = { handleFileUpload };
