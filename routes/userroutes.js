const mongoose = require('mongoose')
const express = require('express')
const noteRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { Usremodel } = require('../model/user.model');


noteRouter.post('/register',async(req,res)=>{
    let {name,email,pass} = req.body;
   try {
     bcrypt.hash(pass,5, async function(err,sercurePass) {
         // Store hash in your password DB.
         if(err){
             res.send({msg:'eror',err});
         }else{
             let newuser = new Usremodel({name,email,pass:sercurePass});
             await newuser.save()
             res.send({msg:'user hasbeen registered',newuser});
             console.log(newuser);
         }
     });
   } catch (error) {
     res.send({msg:'error while register ',error})
     console.log('error while register ',error)
   }
 
 })
 
 noteRouter.post('/login',async(req,res)=>{
     let {email,pass} = req.body;
     
   try {
     let user = await Usremodel.find({email});
     console.log(user[0]._id);
     
     if(user.length>0){
         let token = jwt.sign({userID:user[0]._id},'deepak');
         res.send({msg:'user logged in ',token,user});
         console.log(user,'user loggged in ')
     }
   } catch (error) {
     res.send({msg:'error is there'});
     console.log('error is there')
   }
       
 })

 module.exports ={noteRouter}