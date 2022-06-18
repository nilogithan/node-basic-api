const { json } = require("body-parser");
const express = require("express");
const home = express.Router();

const jwt = require('jsonwebtoken');

home.get('/login',(req,res)=>{
    const user = {
        id:1,
        userName:'Mr_x',
        email:'mrx@mail.com',
    }
    jwt.sign({user},'secretKey',{expiresIn: '30s'},(error,token)=>{
        res.json({token});
    });
    });

home.use('/user',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretKey',(error,authData)=>{
        if (error) {
            res.sendStatus(403);
        }else{
            res.json({message:"home page",authData});
        }
    })
});

function verifyToken(req,res,next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken  = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

    module.exports = home;