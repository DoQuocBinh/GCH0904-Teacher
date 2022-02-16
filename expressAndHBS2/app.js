const express = require('express')
const fs = require('fs');
const async = require('hbs/lib/async');
const app = express()
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://tommy:123456abc@cluster0-shard-00-00.lkrga.mongodb.net:27017,cluster0-shard-00-01.lkrga.mongodb.net:27017,cluster0-shard-00-02.lkrga.mongodb.net:27017/NoSQLBoosterSamples?authSource=admin&replicaSet=Cluster0-shard-0&ssl=true';


app.set('view engine','hbs')
//khai bao thu muc public noi chua static files: images, stylesheet,..
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.post('/register', async (req,res)=>{
    //lay data user nhap tu form Register
    const name = req.body.txtName
    const clazz = req.body.txtClass
    const phone = req.body.txtPhone
    //xay dung doi tuong user
    const user = {
        name : name,
        clazz: clazz,
        phone: phone
    }

    //kiem tra(input validation)
    if(name== null || name.length==0){
        const errorMsg = "Name is required!"
        res.render('dangky',{errorName:errorMsg})
        return
    }
    if(!clazz.startsWith('C')){
        const errorMsg = "ClassName must start with C!"
        res.render('dangky',{errorClazz:errorMsg,user:user})
        return
    }
    
    //fs.appendFileSync('mydata.txt',JSON.stringify(user))
    let client= await MongoClient.connect(url);
    let dbo = client.db("NoSQLBoosterSamples");//NoSQLBoosterSamples: ten database
    await dbo.collection("SanPham").insertOne(user) //SanPham: ten bang
    //tao variable user trong template done
    res.render("done",{user:user})

})

app.get('/register',(req,res)=>{
    res.render('dangky')
})

app.get('/',(req,res)=>{
    const now = new Date()
    //tao mot variable 'ngay' trong template index, gia tri bang bien 'now'
    res.render('index',{ngay:now})
})

const PORT = process.env.PORT || 5000
app.listen(PORT)


