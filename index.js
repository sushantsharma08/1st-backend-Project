const fs = require('fs');
const http = require('http');
const url = require('url');

const read = fs.readFileSync('./source/dataSets/studentData.json','utf-8');
const readJson = JSON.parse(read);

const read1 = fs.readFileSync('./source/html/dashboard.html','utf-8');
const profile = fs.readFileSync('./source/html/profile.html','utf-8');

const replaceTemplate = (temp,product)=>{
    let output = temp.replace(/{%id%}/g,product.id)
    output = output.replace(/{%Name%}/g,product.Name)
    output = output.replace(/{%Age%}/g,product.Age)
    output = output.replace(/{%Class%}/g,product.class)
    output = output.replace(/{%location%}/g,product.location)
    output = output.replace(/{%enrollment%}/g,product.enrollment)
    output = output.replace(/{%skills%}/g,product.skills)
    output = output.replace(/{%profession%}/g,product.profession)
    output = output.replace(/{%description%}/g,product.description)
    output = output.replace(/{%image%}/g,product.image)
    output = output.replace(/{%link%}/g,product.portfoliolink)
    if(!product.portfolio)output = output.replace(/{%NOPORTFOLIO%}/g,'noportfolio')
    return output;
}

const port = 8000;
const serverip='127.0.0.1';
const server = http.createServer((req,res)=>{
    const {query,pathname}=url.parse(req.url,true);

    // console.log(req.url);
    if(pathname==='/'||pathname==="Dashboard"){
        res.end('Welcome to the Server')
    }
    else if(pathname==='/studentapi'){
        res.writeHead(200,{'Content-type':'application/json'})
        res.end(read)
    }
    else if(pathname==='/student'){
        const cards = readJson.map(el=>replaceTemplate(read1,el)).join('');
        res.writeHead(200,{'Content-type':'text/html'})
        res.end(cards)
    }else if(pathname==='/client'){
        console.log(query.id);
        const product = readJson[query.id];
        const output= replaceTemplate(profile,product);
        // res.writeHead(200 ,{'Content-type' : 'application/json'})

        res.end(output)
    }
    // else{
    //     res.writeHead(404);
    //     res.end('Page not Found');
    // }
})
server.listen(port  ,serverip, (err)=>{
    console.log(`listening to server : ${serverip}
 port: ${port}  `);
   });