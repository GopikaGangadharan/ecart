//define connection be/w node and mongodb using mongoose.

//import mongoose
const mongoose = require ('mongoose')

//get connection string from .env
const DB = process.env.DATABASE

//connect mongodb
mongoose.connect(DB,{
    useUnifiedTopology:true, //topology used to connet b/w node and mongodb
    useNewUrlParser:true
}).then(()=>{
    console.log('Cart database successfully');
}).catch((error)=>{
 console.log(error);
})