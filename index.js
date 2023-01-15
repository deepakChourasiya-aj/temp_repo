const express = require('express')
const mongoose = require('mongoose');
const { connection } = require('./config/connection');
const { Usremodel } = require('./model/user.model');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { userAuthenticator } = require('./middleware/userAuthenticator');
const { Bookmodel } = require('./model/book.mode');
const { noteRouter } = require('./routes/userroutes');
const { bookrouter } = require('./routes/notesroute');

var cors = require('cors') 
app.use(cors())

app.use(express.json());
require('dotenv').config();
app.get('/',(req,res)=>{
    res.send({mgg:'hello '})
})
app.use('/my',noteRouter);


// "name":"deepak",
// "email":"deepak@gmail.com",
// "pass":"123"


app.use(userAuthenticator);
app.use('/mybook',bookrouter)


app.listen(process.env.port,async()=>{
    await connection
    console.log(`server is runing on ${process.env.port}`)
})