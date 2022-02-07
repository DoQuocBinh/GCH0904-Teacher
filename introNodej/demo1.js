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

// const docFile = (loi,dulieu) =>{
//     if(loi){
//         console.log("Loi roi, co the file k co")
//     }else{
//         console.log(dulieu)
//     }
// }
// console.log("11111.1111")
// fs.readFile('mydata.txt','utf-8',docFile)
// console.log("333.3333")


function getFile (fileName)  {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName,'utf-8', (err, data) => {
        if (err) {
          // calling `reject` will cause the promise to fail with or without the error passed as an argument
          reject(err) 
          // and we don't want to go any further  
          return        
        }
        resolve(data)
      })
    })
  }

  console.log("1")
  getFile('33333mydata.txt').then(dulieu=>console.log(dulieu))
                            .catch(loi=>console.log(loi))
  console.log('3')
  