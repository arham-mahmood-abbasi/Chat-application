const User = require('../Models/user')
const Person = require('../Models/person')
const jwt = require("jsonwebtoken");
require('dotenv').config();
// Generate token for the login
function GenerateToken(user){
    const payload = {role:user.role,id:user._id,};
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
// function for the login procedure
async function login(req,res){
    const {username,password}=req.body;
    try{
        const user = await User.findOne({ username }).populate('personId');
        if(!user) return res.status(404).json({error:'User not found'});
        if(!isMatch(username,password,user)) return res.status(401).json({error:'Invalid Credentials'});
        const fullName = user.personId.firstName +" " +user.personId.lastName
        token=GenerateToken(user);
        return res.status(200).json({message:'Loged in successfully',username:username,fullName:fullName,userId:user.id,token:token});
    }
    catch(err){
        return res.status(500).json({error:err});
    }
}
// Function to register user
async function signUp(req,res){
    const { username, password, firstName, lastName,email,gender,role } = req.body;
    try{
        if (role !== 'admin' && role !== 'super' && role !=='user'){
            return res.status(401).json({messag:'Role not allowed'})
        }
        const newPerson = await Person.create(req.body)
        const newUser=await User.create(req.body);
        newUser.personId = newPerson._id;
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:err});
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
      res.tatus(500).json({ error: error });
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
}