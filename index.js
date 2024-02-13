// Loads .env file contents into process.env by default
require("dotenv").config()
const express=require('express')
const cors=require('cors')
const router=require('./Routes/router')
require('./DB/connection')
//express server
const pfServer=express()

//1. use cors in server
pfServer.use(cors())
//2. use json parser - application specific middleware
pfServer.use(express.json())

pfServer.use('/uploads',express.static('./uploads'))

//3. use router
pfServer.use(router)

const PORT=3000

//to host pfServer
pfServer.listen(PORT,()=>{
    console.log(`Project fair server started at port ${PORT}`);
})

//to resolve http GET request to loacalhost:3000

pfServer.get('/',(req,res)=>{
    res.send("<h1 style=color:teal;text-align:center>Waiting for client request</h1>")
})

// pfServer.post('/',(req,res)=>{
//     res.send("Post request")
// })