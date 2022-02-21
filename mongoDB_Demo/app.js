const express = require('express')
const async = require('hbs/lib/async')
const { insertObject, getAllFromCollection } = require('./databaseHandler')
const app = express()


app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/all', async (req,res)=>{
    const collectionName = 'SanPham'
    const result = await getAllFromCollection(collectionName)
    res.render('all',{products:result})
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
    const collectionName = 'SanPham'
    await insertObject(collectionName,newP)
    res.render('index')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')


