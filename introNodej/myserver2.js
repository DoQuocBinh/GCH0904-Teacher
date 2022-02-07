const express = require('express')
const app = express()

app.get('/',(req,res)=>{
   res.sendFile(__dirname +  "/home.html")
})

app.get('/student',(req,res)=>{
    res.end("student")
})

app.listen(5000)
console.log("Server is running1")