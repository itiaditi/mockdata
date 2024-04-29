const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { UserModel } = require("../model/user.model");

const userRouter = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      UserModel:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              role:
 *                  type: array
 */
/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all the users 
 *      tags: [UserModel]
 *      response:
 *          '200':
 *              description: All users detail
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schema/UserModel'
 *          '400':
 *              description: Cannot find any user
 */
//get user details
userRouter.get("/",async(req,res)=>{
   try{
    const users = UserModel.find();
    const data=await users;
    res.status(200).json({msg:"get the user details",data})
   }catch(err){
    res.status(400).json({err})
   }
})

//register users

userRouter.post("/register",async(req,res)=>{
    const {username,email,password,role} = req.body;
    try{
        const hashpassword=await bcrypt.hash(password,10);
        const users = UserModel({username,email,password:hashpassword,role});
        await users.save();
        res.status(200).send("a new user has been registered")
    }catch(err){
        res.status(400).json({err});
    }
})

//login users

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        
        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(401).send("user not fiound")
        }
        console.log(password)
         bcrypt.compare(password,user.password,(err,result)=>{
            if(err) throw new Error(err.message);
            if(result){
                const accessToken =jwt.sign({_id:user._id},"masai",{expiresIn:'1h'});
                res.status(200).json({msg:"Login success",accessToken})
            }
        });
        
    }catch(err){
        res.status(400).json({err:err.message});
    }
})

module.exports={
    userRouter
}