const mongoose = require('mongoose')

const bookschema = mongoose.Schema({
    name:String,
    author:String,
    delivery:String,
    userID:String
})

const Bookmodel = mongoose.model('bookdata',bookschema)
module.exports = {Bookmodel}