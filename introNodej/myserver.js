const http = require('http')

const server = http.createServer((req,res) => {
   if(req.url == '/'){
       res.writeHead(200, { 'Content-Type': 'text/html' }); 
       res.end("<h1 style='color:red'>Home page 1</h1>")
   }else if (req.url == '/student'){
       res.end("Student page!")
   }else{
       res.end("Invalid page")
   }

})

server.listen(5000)
console.log("Server is running!")