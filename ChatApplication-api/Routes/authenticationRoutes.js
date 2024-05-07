const express = require('express');
const router = express.Router();
const autenticationController = require('../Controller/authenticationController');
const {validateToken} = require('../Middleware/authMiddleware');

router.post('/register',autenticationController.signUp, autenticationController.two_factor_authentication_generator);
router.post('/login', validateToken ,autenticationController.login);
router.get('/user',autenticationController.getAllUsers);
router.post('/getQR', validateToken,autenticationController.login_to_2FA_auth_generator ,autenticationController.two_factor_authentication_generator);
router.get('/user/:id',autenticationController.getUser);
router.delete('/user/:id',autenticationController.deleteUser);
router.put('/user/:id',autenticationController.updateUser);
router.post('/user/verify', validateToken ,autenticationController.two_factor_authentication_verifier);
router.post('/validateUser', autenticationController.validateUser);
router.post('/changePassword', validateToken, autenticationController.changePassword);
module.exports=router;