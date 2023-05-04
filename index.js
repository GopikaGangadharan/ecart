
//loads .env file contents into process.env //imp
require('dotenv').config()
const express = require('express')
const cors = require('cors')

//import connection.jsfile to connect mongodb
require('./db/connection')

//import router
const router= require('./routes/router')

//create server app using express
const server = express()


//use cors and express.json() to your server app
//application specific middleware
server.use(cors())
server.use(express.json())

//use router in server
server.use(router)


//create port to listen your server app
const PORT =3000 || process.env.PORT

//api test
// server.get('/',(req,res)=>{
//     res.status(200).json("E cart server started")
// })

//Run server app in their specific port
server.listen(PORT,()=>{
    console.log(`E cart server started at port: ${PORT}`);
})



  