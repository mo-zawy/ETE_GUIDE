const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true,
    },
},{
    timestamps:true
})


const Contact = mongoose.model('Contact' , contactSchema)

module.exports = Contact