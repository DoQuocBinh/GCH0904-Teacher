const doSomethingAsync = () => {
    return new Promise(resolve => {
      setTimeout(() => resolve('I did something'), 3000)
    })
  }
  
  const doSomething = async () => {
    console.log(await doSomethingAsync())
  }

// async function doSomething()
// {
//     const result = await doSomethingAsync()
//     console.log(result)
// }  

// const x = () =>{
//     console.log('Before')
//     doSomething()
//     console.log('After')
// }
// x()  
// const doSomething2 = async () => {
//     console.log('Before')
//     console.log(await doSomethingAsync())
//     console.log('After')
//   }
// doSomething2()

console.log('Before')
doSomethingAsync().then(data=>console.log(data))
console.log('After')