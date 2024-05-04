const express = require('express');
const router = express.Router();
const classController = require('../Controller/classController');

router.post('/class',classController.createClassroom)
router.get('/class',classController.getAllClassrooms)
router.put('/class/:id',classController.updateClassroom)
router.get('/class/:id',classController.getClassroomById)
router.delete('/class/:id',classController.deleteClassroom)

module.exports=router;