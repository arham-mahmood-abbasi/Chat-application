const mongoose = require('mongoose');
const Classroom = require('../models/classroom')
// Create Classroom page
async function createClassroom(req,res){
    try{
        const newClassroom = new Classroom(req.body);
        await newClassroom.save();
        res.status(201).json(newClassroom);
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
// function to get all the users
async function getAllClassrooms(req,res){
    try{
        const Classrooms = await Classroom.find();
        res.status(200).json(Classrooms);
    }catch(e){
        res.status(500).json({error:e})
    }
}
// get a particular Classroom by the id of the user
async function getClassroomById(req,res){
    try{
        const {id} = req.params
        const Classroom = await Classroom.findById(id);
        res.status(200).json(Classroom);
    }catch(e){
        res.status(500).json({error:e})
    }
}
// Update a particular Classroom
async function updateClassroom(req,res){
    try{
        const id = req.params.id
        const {status} = req.body
        console.log(id)
        if(status!='pending'){
            res.status(400).json({message:'Cannot update this Classroom'})
        }
        const updatedClassroom = await Classroom.findByIdAndUpdate(id,req.body,{new:true});
        console.log(updatedClassroom)
        if(!updatedClassroom){
            res.status(404).json({message:'Classroom not found'});
        }
        res.status(200).json({message:'Classroom Updated Successfully.'})

    }
    catch(e){

    }
}
// Delete Classrooms by id
async function deleteClassroom(req,res){
    try{
        const query = {id : req.params};
        const deletedClassroom = await Classroom.deleteOne(query);
        if(!deletedClassroom){
            res.status(404).json({message:'Classroom not found!'})
        }
        res.sendStatus(204);
    }
    catch(e){
        console.log(e)
        res.status(500).json({error:{e}})
    }
}

module.exports={
    createClassroom,
    updateClassroom,
    getClassroomById,
    getAllClassrooms,
    deleteClassroom
}