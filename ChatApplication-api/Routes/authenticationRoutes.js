const express = require('express');
const router = express.Router();
const autenticationController = require('../Controller/authenticationController');

router.post('/register',autenticationController.signUp);
router.post('/login',autenticationController.login);
router.get('/user',autenticationController.getAllUsers);
router.get('/user/:id',autenticationController.getUser);
router.delete('/user/:id',autenticationController.deleteUser);
router.put('/user/:id',autenticationController.updateUser);
module.exports=router;