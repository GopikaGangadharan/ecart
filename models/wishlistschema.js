//define schema for wishlist

//import mongoose
const mongoose = require('mongoose')

//using mongoose define schema
const wishlistSchema = mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
    
})

//create model using the above schema
const wishlists = mongoose.model("wishlists",wishlistSchema)

//export model
module.exports = wishlists


//name collection is same as the modal in schema and it will be in small s and it is in prural