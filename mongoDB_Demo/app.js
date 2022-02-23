const express = require('express')
const async = require('hbs/lib/async')
const { ObjectId } = require('mongodb')
const { insertObject, getAllFromCollection, getDocumentById, updateCollection, deleteDocumentById, findCommentById } = require('./databaseHandler')
const app = express()


app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/edit', async (req,res)=>{
    const updateId = req.body.txtId
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picURL = req.body.txtPictureURL

    const newvalues = { $set: {'name': name, 'price': price,'pic':picURL } }
    const myQuery = {_id: ObjectId(updateId)}
    const collectionName = 'SanPham'
    await updateCollection(collectionName,myQuery,newvalues)
    res.redirect('/all')
})
app.post('/createComment', async (req,res)=>{
    //id product
    const id = req.body.txtId
    const comment = req.body.txtComment
    const newComment = {
        'productId' : id,
        'comment' :comment
    }
    const collectionName = 'comments'
    await insertObject(collectionName,newComment)
    const allComment = await findCommentById(id)

    const sanPhamCollection = 'SanPham'
    const document = await getDocumentById(sanPhamCollection,id)
    res.render('comment',{product:document,comments:allComment})

})
app.get('/createComment',async (req,res)=>{
    //lay thong tin san pham can tao comment
    const id = req.query.id
    
    const collectionName = 'comments'
    const allComment = await findCommentById(id)

    const sanPhamCollection = 'SanPham'
    const document = await getDocumentById(sanPhamCollection,id)
    res.render('comment',{product:document,comments:allComment})
})

app.get('/delete',async (req,res) =>{
    const id = req.query.id
    const collectionName = 'SanPham'
    await deleteDocumentById(collectionName,id)
    res.redirect('/all')
})

app.get('/all', async (req,res)=>{
    const collectionName = 'SanPham'
    const result = await getAllFromCollection(collectionName)
    res.render('all',{products:result})
})

app.get('/edit',async (req,res)=>{
    const id = req.query.id
    const collectionName = 'SanPham'
    const document = await getDocumentById(collectionName,id)
    console.log(document)
    res.render('edit',{product:document})
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


