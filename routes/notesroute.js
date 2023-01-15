const express = require('express')
const mongoose = require('mongoose')
const bookrouter = express.Router(); 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { Bookmodel } = require('../model/book.mode');


bookrouter.post('/book',async(req,res)=>{
    try {
        let payload = req.body;
        let newbook = new Bookmodel(payload);
        await newbook.save();
        res.send({msg:'book has been added db',newbook});
        console.log(newbook);
    } catch (error) {
        res.send({'msg':'book error',error});
        console.log({'msg':'book error',error})
    }
})
bookrouter.get('/book/all',async(req,res)=>{
    try {
      let data = await Bookmodel.find();
        res.send(data);
        console.log(data)
    } catch (error) {
        res.send({msg:'book error',error});
        console.log({msg:'book error',error})
    }
})

bookrouter.patch("/update/:id",async(req,res)=>{
    let id_making_request = req.body.userID;
    let id = req.params.id;
    let payload = req.body;
    let findpro = await Bookmodel.find({"_id":id})
    let id_in_product = findpro[0].userID
    console.log(findpro[0].userID,'iam product id',id_making_request)
    try {
        if(id_making_request!=id_in_product){
            res.send({msg:'user has wrong user id'});
            console.log('user has wrong user id')
        }else{
            let updated = await Bookmodel.findByIdAndUpdate({'_id':id},payload);
            res.send({'msg':'user has been updated',updated});
            console.log({msg:'user data updated',updated});
        }
    } catch (error) {
        res.send({'msg':'error in updating'});
        console.log({msg:'user data updated',error});
    }
})

bookrouter.delete("/delete/:id",async(req,res)=>{
    let id_making_request = req.body.userID;
    let id = req.params.id;
    let payload = req.body;
    let findpro = await Bookmodel.find({"_id":id})
    let id_in_product = findpro[0].userID
    console.log(findpro[0].userID,'iam product id',id_making_request)
    try {
        if(id_making_request!=id_in_product){
            res.send({msg:'user has wrong user id'});
            console.log('user has wrong user id')
        }else{
            let deleted = await Bookmodel.findByIdAndDelete({'_id':id});
            res.send({'msg':'user has been deleted',deleted});
            console.log({msg:'user data deleted',deleted});

        }
    } catch (error) {
        res.send({'msg':'error in deleting'});
        console.log({msg:'user data deleting',error});
    }
})

module.exports = {bookrouter}