const fs = require('fs');
const http = require('http');
const url = require('url')



const port = 8000;
const server = http.createServer((req,res)=>{
    const pathName = req.url;
    console.log(req.url);
    if(pathName==='/'||pathName==="Dashboard"){
        res.end('Welcome to the Server')
    }
    else if(pathName==='/studentapi'){
        res.writeHead(200,{'Content-type':'text/html'})
        res.end(read)
    }
    
})
server.listen(port  ,'127.0.0.1', (err)=>{
    console.log(`listening to port ${port}`);
   });
const read = fs.readFileSync('./source/dataSets/studentData.json','utf-8');

console.log(read);