const express = require('express')
const app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index')
})
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://tommy:123456abc@cluster0-shard-00-00.lkrga.mongodb.net:27017,cluster0-shard-00-01.lkrga.mongodb.net:27017,cluster0-shard-00-02.lkrga.mongodb.net:27017/NoSQLBoosterSamples?authSource=admin&replicaSet=Cluster0-shard-0&ssl=true';

app.post('/insert',async (req,res)=>{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picURL = req.body.txtPictureURL
    const newP = {
        'name' : name,
        'price': price,
        'pic' : picURL
    }
    let client= await MongoClient.connect(url);
    let dbo = client.db("GCH0904_DB");//GCH0904_DB: ten database
    await dbo.collection("SanPham").insertOne(newP) //SanPham: ten bang
    res.render('index')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')