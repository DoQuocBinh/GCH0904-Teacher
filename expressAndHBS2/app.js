const express = require('express')
const fs = require('fs')
const app = express()

app.set('view engine','hbs')
//khai bao thu muc public noi chua static files: images, stylesheet,..
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.post('/register',(req,res)=>{
    //lay data user nhap tu form Register
    const name = req.body.txtName
    const clazz = req.body.txtClass
    //xay dung doi tuong user
    const user = {
        name : name,
        clazz: clazz
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
    
    fs.appendFileSync('mydata.txt',JSON.stringify(user))
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


