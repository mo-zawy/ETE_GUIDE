const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    name:{ type : String, required:true},
    rating:{ type : Number, required:true},
    comment:{ type : String, required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
},{
    timestamps:true
}

)

const productSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    images:[String],
    location:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    timeRegion:{
        type:String,
        required:true,
    },
    governorate:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    reviews:[reviewSchema],
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    },
},{
    timestamps:true
})


const  Product= mongoose.model('Product' , productSchema)

module.exports = Product