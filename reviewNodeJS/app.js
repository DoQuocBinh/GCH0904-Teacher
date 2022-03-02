const express = require('express')
const { insertObject, findUserByName } = require('./databaseHandler')
const app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.post('/register',async (req,res)=>{
    const name = req.body.txtName
    const role = req.body.txtRole
    if(name.length < 5){
        const errorName = "Name Length must >= 5 characters"
        res.render('register',{'name': name, 'errorName':errorName})
        return
    }
    if((name.indexOf('@')>0) || (name.indexOf('.')>0)){
        const errorName = "Name can NOT have special characters!!!"
        res.render('register',{'name': name, 'errorName':errorName})
        return
    }
    const result = await findUserByName(name)
    if(result != null){
        const errorName = "User da co san trong database!!!"
        res.render('register',{'name': name, 'errorName':errorName})
        return
    }
    //da kiem tra het loi
    const collectionName = "users"
    const newUser = {
        'name': name,
        'role':role
    }
    insertObject(collectionName,newUser)
    res.end("Ban dang dang ky thanh cong!!")
})

app.get('/',(req,res)=>{
    res.render('register')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)