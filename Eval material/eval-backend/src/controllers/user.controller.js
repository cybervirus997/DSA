const express = require('express')
const router = express.Router()
const fs = require('fs')
require('dotenv').config()
const jwt = require("jsonwebtoken")
const authenticate = require('../middlewares/authenticate')
const authorise = require('../middlewares/authorise')



const User = require('../models/user.model')
const upload = require('../utils/file-upload')

const newToken = (user) =>{
        return jwt.sign({user:user}, process.env.JWT_SECRET_KEY)
}

router.post("/register",upload.single("profilePic"),async (req,res) =>{

    let user;
    

    try{

        user = await User.findOne({email:req.body.email}).lean().exec();
        
        if(user){
             
            fs.unlink(user.file.path,async function(err){
                return 
            })
            
            return res.status(400).send({status:"failed",message:"Please try with different email and password"})
        }

        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            profile_photo_url:req.file.path,
            roles:req.body.roles
        })
        
        
        if(!user) return res.status(500).send({status:"failed", message: "Please try again later"})
        
        const token = newToken(User)

        return res.status(201).json({token});

    }catch(err){
       
         return res.status(500).send({status:"failed", message:"Please try again later"})
    
    }
})

router.post("/login",async(req,res) => {
    
    try{
        
        let user = await User.findOne({email:req.body.email}).exec()
        
        if(!user) return res.status(400).send({status:"failed", message:"Please try with a different email"})
       
        const match = await user.checkPassword(req.body.password)

        if(!match) return res.status(400).send({status:"failed", message:"Please try with a different email"})

        const token = newToken(user)

        return res.status(201).json({token})

    }catch(err){

        return res.status(500).send({status:"failed", message:"Please try again later"})
    }
})

router.get("",async(req,res) => {
    try{
        const users = await User.find().lean().exec()
        return res.status(200).send(users)
    }catch(err){
        return res.status(404).send("something went wrong")
    }
})

router.delete("/:id",authenticate,authorise(["admin"]), async(req,res) => {
          
   try{
          const user = await User.findById(req.params.id).lean().exec()
          
          if(user){

         fs.unlink(user.profile_photo_url,async function(err){
            return 
         })

          const changed = await User.findByIdAndRemove(req.params.id) 
          return res.send("deleted")
         }
    }catch(err){
        return res.status(500).send("Please try again later")
    }
  
})

module.exports = router

