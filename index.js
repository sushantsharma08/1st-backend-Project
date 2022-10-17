const fs = require('fs');
const http = require('http');
const url = require('url');

const read = fs.readFileSync('./source/dataSets/studentData.json','utf-8');
const readJson = JSON.parse(read);

const read1 = fs.readFileSync('./source/html/dashboard.html','utf-8');

const replaceTemplate = (temp,product)=>{
    let output = temp.replace(/{%id%}/g,product.id)
    output = output.replace(/{%Name%}/g,product.Name)
    output = output.replace(/{%Age%}/g,product.Age)
    output = output.replace(/{%Class%}/g,product.class)
    return output;
}

const port = 8000;
const server = http.createServer((req,res)=>{
    const pathName = req.url;
    console.log(req.url);
    if(pathName==='/'||pathName==="Dashboard"){
        res.end('Welcome to the Server')
    }
    else if(pathName==='/studentapi'){
        const cards = readJson.map(el=>replaceTemplate(read1,el)).join('');
        res.writeHead(200,{'Content-type':'text/html'})
        res.end(cards)
    }
    
})
server.listen(port  ,'127.0.0.1', (err)=>{
    console.log(`listening to port ${port}`);
   });

console.log(read);