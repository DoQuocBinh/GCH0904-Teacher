const fs = require('fs')
// var x =20
// const y = x +50
// for(i=1;i<10;i++)
//     myJob()

// console.log("Hello")
setTimeout(()=>{
    console.log('Hello guys!!!')
},3000)
// console.log("goodbye")

const docFile = (loi,dulieu) =>{
    if(loi){
        console.log("Loi roi, co the file k co")
    }else{
        console.log(dulieu)
    }
}
console.log("11111.1111")
fs.readFile('mydata.txt','utf-8',docFile)
console.log("333.3333")