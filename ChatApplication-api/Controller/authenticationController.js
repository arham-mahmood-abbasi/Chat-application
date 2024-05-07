const User = require('../Models/user')
const Person = require('../Models/person')
const jwt = require("jsonwebtoken");
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');



function generateSecretKey(userName){
    let secret = speakeasy.generateSecret({
        name: userName
    });
    return secret;
}

async function generateQR(secret) {
    return new Promise((resolve, reject) => {
        qrcode.toDataURL(secret.otpauth_url, function(err, data) {
            if (err) {
                reject(err); // Reject the promise with the error if there is one
            } else {
                resolve(data); // Resolve the promise with the QR code data
            }
        });
    });
}


require('dotenv').config();
// Generate token for the login
function GenerateToken(user){
    const payload = {id:user._id};
    const token = jwt.sign(payload,process.env.SECRET_KEY);
    return token;
}
// check if the user matches or not
function isMatch(username,password,user){
    if(username == user.username && password == user.password){
        return true;
    }
    return false;
}

async function validateUser(req, res){
    try{
        const {username} = req.body;
        const isUserExist = await User.findOne({username: username});
        if(!isUserExist){
            res.status(404).json({message: "User Not Found!"});
        }
        let token = GenerateToken(isUserExist);
        return res.status(201).json({ token: token });
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}


async function changePassword(req, res) {
    try{
        const { password } = req.body;
        const { user } = req;
        const isUser = await User.findById(user.id);
        if(!isUser){
            return res.status(404).json({ error: "User not found" });
        }
        isUser.password = password;
        await isUser.save();
        res.status(200).json({ message: "Password changed successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// function for the login procedure
async function login(req,res, next){
    const {username,password}=req.body;
    try{
        const user = await User.findOne({ username });
        if(!user) return res.status(404).json({error:'User not found'});
        if(!isMatch(username,password,user)) return res.status(401).json({error:'Invalid Credentials'});
        token=GenerateToken(user);
        if(user.verified === false){
            return res.status(400).json({message:'Not Verified User',token:token});
        }
        return res.status(201).json({message:'Loged in successfully',userId:user.id,token:token});
    }
    catch(err){
        return res.status(500).json({error:err});
    }
}

//Function to register user
async function signUp(req, res, next) {
    const { name, email, password } = req.body;
    try {
        let isUserExist = await User.find({ username: email });
        if (isUserExist.length > 0) {
            return res.status(409).json({ message: "User Already Exist" });
        }
        const user = await User.create({ username: email, password: password, verified: false });
        const person = await Person.create({ userID: user._id, personName: name });
        const token = GenerateToken(user);
        res.cookie('token', token);
        req.token = token; // Setting token in req.token
        next(); // Passing control to the next middleware
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err });
    }
}


async function login_to_2FA_auth_generator(req, res, next) {
    try{
        const {user} = req;
        req.token = user;
        const person = await Person.findOne({userID: user.id});
        req.body.name = person.personName;
        next();
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}


async function two_factor_authentication_generator(req, res) {
    try {
        const { name } = req.body;
        const { token } = req;
        let secret = generateSecretKey(name);
        let imageData = await generateQR(secret); // Wait for the QR code generation
        if (!imageData) {
            return res.status(409).json({ message: "Can't do it" });
        }
        return res.status(200).json({ message: "Image Created Successfully", qrSecret: secret.ascii, image: imageData, token: token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function two_factor_authentication_verifier(req, res){
    try{
        const { secretKey, tokenKey } = req.body;
        const { user } = req;
        console.log(user);
        const isVerified =  speakeasy.totp.verify({
            secret: secretKey,
            encoding: 'ascii',
            token: tokenKey
        });
        if(isVerified === false){
            return res.status(400).json({message: "QR TOKEN IS NOT VALID"});
        }

        const verifyUser = await User.findById({_id: user.id});
        verifyUser.verified = true;
        await verifyUser.save();

        return res.status(201).json({ message: "QR TOKEN IS VALID" });
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}



// Get the list of all users
async function getAllUsers(req,res){
    try{
        const users=await User.find();
        res.status(200).json(users);
    }catch(error){
        res.tatus(500).json({error:error});
    }
}
// Get a particular user
async function getUser(req,res){
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }

}
// Update the users
async function updateUser(req,res){
    try {
      const {id} = req.params;
      const updatedUser = await User.findByIdAndUpdate(id,req.body,{new:true});
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error });
    }

}

async function deleteUser(req,res){
    try {
      const {id} = req.params;
      await User.findByIdAndRemove(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error });
    }
}


module.exports={
    getAllUsers,
    login,
    signUp,
    getUser,
    updateUser,
    deleteUser,
    two_factor_authentication_generator,
    two_factor_authentication_verifier,
    login_to_2FA_auth_generator,
    validateUser,
    changePassword
}