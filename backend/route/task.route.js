const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { TaskModel } = require('../model/task.model');
const { access } = require('../middleware/access.middleware');

const taskRouter = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      TaskModel:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              title:
 *                  type: string
 *              description:
 *                  type: string
 *              status:
 *                  type: array
 *              priority:
 *                  type: string
 *              createdBy:
 *                  type: objectId
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: Get all the task detail 
 *      tags: [TaskModel]
 *      response:
 *          '200':
 *              description: All task detail
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schema/TaskModel'
 *          '400':
 *              description: Cannot find any task
 */
taskRouter.get("/",auth,async(req,res)=>{
    try{
        const task = await TaskModel();
        res.status(200).json({msg:"Get all the task",task});
    }catch(err){
        res.status(400).json({err:err.message})
    }
})

//create task
taskRouter.post("/createTask",auth,async(req,res)=>{
    const {title,description,priority,status} = req.body;
    try{
        const task = new TaskModel({title,description,priority,status,createdBy:req.body.userId});
        await task.save();
        res.status(200).json({msg:"task created"})
    }catch(err){
        res.status(400).json({err:err.message})
    }
})
/**
 * @swagger
 * /createTask:
 *  get:
 *      summary: Get all the task created by you 
 *      tags: [TaskModel]
 *      response:
 *          '200':
 *              description: All task detail
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schema/TaskModel'
 *          '400':
 *              description: Cannot find any user
 */
taskRouter.get("/createTask",auth,async(req,res)=>{
    // const {title,description,priority,status} = req.body;
    try{
        const task = await TaskModel.find();
        
        res.status(200).json({msg:"task created",task})
    }catch(err){
        res.status(400).json({err:err.message})
    }
})

taskRouter.patch("/:id",auth,async(req,res)=>{
    const {id} = req.params;
    const {title,description,status,priority} = req.body;
    try{
        const task = await TaskModel.findByIdAndUpdate(id,{title,description,status,priority});
        const data=task.save();
        res.status(200).json({msg:"update success",data})
    }catch(err){
        res.status(400).json({err:err.message});
    }
})
taskRouter.delete("/:id",auth,async(req,res)=>{
    const {id} = req.params;
    try{
        const task = await TaskModel.findByIdAndDelete(id);
      
        res.status(200).json({msg:"update success",task})
    }catch(err){
        res.status(400).json({err:err.message});
    }
})
module.exports={
    taskRouter
}