const mongoose = require('mongoose');
const Assignment = require('../models/assignment')
// Create Assignment page
async function createAssignment(req,res){
    try{
        const newAssignment = new Assignment(req.body);
        await newAssignment.save();
        res.status(201).json(newAssignment);
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
// function to get all the users
async function getAllAssignments(req,res){
    try{
        const Assignments = await Assignment.find();
        res.status(200).json(Assignments);
    }catch(e){
        res.status(500).json({error:e})
    }
}
// get a particular Assignment by the id of the user
async function getAssignmentById(req,res){
    try{
        const {id} = req.params
        const Assignment = await Assignment.findById(id);
        res.status(200).json(Assignment);
    }catch(e){
        res.status(500).json({error:e})
    }
}
// Update a particular Assignment
async function updateAssignment(req,res){
    try{
        const id = req.params.id
        const {status} = req.body
        console.log(id)
        if(status!='pending'){
            res.status(400).json({message:'Cannot update this Assignment'})
        }
        const updatedAssignment = await Assignment.findByIdAndUpdate(id,req.body,{new:true});
        console.log(updatedAssignment)
        if(!updatedAssignment){
            res.status(404).json({message:'Assignment not found'});
        }
        res.status(200).json({message:'Assignment Updated Successfully.'})

    }
    catch(e){

    }
}
// Delete Assignments by id
async function deleteAssignment(req,res){
    try{
        const query = {id : req.params};
        const deletedAssignment = await Assignment.deleteOne(query);
        if(!deletedAssignment){
            res.status(404).json({message:'Assignment not found!'})
        }
        res.sendStatus(204);
    }
    catch(e){
        console.log(e)
        res.status(500).json({error:{e}})
    }
}

module.exports={
    createAssignment,
    updateAssignment,
    getAssignmentById,
    getAllAssignments,
    deleteAssignment
}