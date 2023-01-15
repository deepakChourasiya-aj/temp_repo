const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    pass:String
})

const Usremodel = mongoose.model('Userloginsignup',userSchema)
module.exports = {Usremodel}