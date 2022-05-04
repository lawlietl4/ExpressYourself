const express = require('express');
const fs = require('fs');
const pug = require('pug');
const port = 3000;
const server = express();
server.use(express.json());
const featureJSON = require('./public/features.json');

server.get('/',(req,res,next)=>{
    const template = pug.compileFile('public/templates/title.pug')({});
    res.end(template);
});

server.get('/features',(req,res,next)=>{
    const template = pug.compileFile('public/templates/features.pug')({'featureJSON': featureJSON.features});
    res.end(template);
});

server.get('/orders', (req,res,next)=>{
    const template = pug.compileFile('public/templates/order.pug')({});
    res.end(template);
});

server.post('/orderIntake', (req,res,next)=>{
    const template = pug.compileFile('./public/templates/orderComplete.pug')({});
    res.end(template);
    let data = res.json();
    fs.writeFile('./public/output/order.txt', data, (req,res)=>{
        
    });
    res.redirect('/orders');
});

server.listen(port,(error)=>{
    if(error) throw error;
    console.log(`server running on ${port}`);
});