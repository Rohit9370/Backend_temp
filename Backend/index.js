// const http=require('http')
// const data=require('./app')

// http.createServer((req,res)=>{
//   res.writeHead(200,{'Content-type':'application/json'});
//   res.write(JSON.stringify(data))
//   res.end();
// }).listen(8000)

// 
// const fs=require('fs')
// const path=require('path');
// const { deflate } = require('zlib');

// const dirPath = path.join(__dirname, 'Views');
// const filePath = path.join(dirPath, 'apple.txt');

//for create file apple.txt
// fs.writeFileSync(filePath, 'This is an apple file');


// for red a file 
// const data=fs.readFileSync(filePath,'utf8');
//  console.log(data)

// for update a file
// fs.appendFileSync(filePath, ' This text is appended.');
// console.log('File updated successfully');

//delate a file
// fs.unlinkSync(filePath);
// let a=12;

// const waiting=new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     resolve(30)
//   },2000)
// })

// waiting.then((b)=>{
//   console.log(a+b)

// })

// let a=23;
// const Wait=new Promise((resolve,rejected)=>{
//     setTimeout(()=>{
//         resolve(20)
//     },2000)
// })

// Wait.then((b)=>{
//   console.log(a+b);
  
// })

// const { log } = require('console');
// const fs=require('fs')
// const path=require('path')

// const dirpath= path.join(__dirname,'Views')
// const file=`${dirpath}/apple.txt`

// fs.writeFileSync(file,'hihhhhh')

// const data=fs.readFileSync(file,'utf8')
// console.log(data)

// const express=require('express')
// const app=express();
// const port=2000;

// app.get('/',(req,res)=>{
//      res.send("start express")
// });

// app.get('/about',(req,res)=>{
//   res.send("start express abiut")
// });
// app.listen(port)

// const http=require('http');
// const data=require('./app')

// http.createServer((req,res)=>{
//         res.writeHead(404,{'content-type':'application/json'})
//         res.write(JSON.stringify(data))
//         res.end();
// }).listen(9000)

// const express=require('express')
// const app=express();
// const port =9000;

// app.get('/',(req,res)=>{
    
//       res.send(`
//          <input type="text" placeholder="ente name" value="${req.query.name}"/>
//          <button>Click me<button/>
//          <a href="/about">About</a>
//         `)
// })
// app.get('/about',(req,res)=>{
//      res.send([{
//         name:"ayush",
//         name:"ayush",
//      }])
// })
// app.listen(9000)

const express=require('express')
const path=require('path')

const app=express()
const port=9000

const publicd=path.join(__dirname,'public');

// app.use(express.static(public))

app.set('view engine','ejs')

app.get('/profile',(req,res)=>{
    res.render('profile')
})

app.get('/',(req,res)=>{
    res.sendFile(`${publicd}/index.html`)
})


app.get('/about',(req,res)=>{
    res.sendFile(`${publicd}/About.html`)
})

app.get('*',(req,res)=>{
    res.sendFile(`${publicd}/error.html`)
})

app.listen(port)




