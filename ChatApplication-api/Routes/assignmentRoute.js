const express = require('express');
const router = express.Router();
const assignmentController = require('../Controller/assignmentController');

router.post('/assignment',assignmentController.createAssignment)
router.get('/assignment',assignmentController.getAllAssignments)
router.put('/assignment/:id',assignmentController.updateAssignment)
router.get('/assignment/:id',assignmentController.getAssignmentById)
router.delete('/assignment/:id',assignmentController.deleteAssignment)

module.exports=router;