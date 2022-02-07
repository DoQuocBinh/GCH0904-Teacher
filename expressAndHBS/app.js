const fs = require('fs')
const express = require('express')
const app = express()


//#1
app.set('view engine','hbs')
//#2: tao thu muc views
//#3: tao file view(hbs) trong thu muc views

app.get('/',(req,res)=>{
    //#4:
    const content = fs.readFileSync('mydata.txt','utf-8')
    res.render('home',{data:content})
})

app.get('/s',(req,res)=>{
    //array: empty
    let ds = []
    //them 2 phan tu vao array
    ds.push({name:'linh', age : 21})
    ds.push({name:'minh', age : 22})
    ds.push({name:'hoang', age : 19})
    res.render('student',{danhsach:ds})   
})

app.listen(5000)
console.log("Server is running")