const express = require('express')
const { insertObject } = require('./databaseHandler')
const app = express()


app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index')
})


app.post('/insert',async (req,res)=>{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picURL = req.body.txtPictureURL
    const newP = {
        'name' : name,
        'price': price,
        'pic' : picURL
    }
    const databaseName = 'GCH0904_DB'
    const collectionName = 'SanPham'
    await insertObject(databaseName,collectionName,newP)
    res.render('index')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')


