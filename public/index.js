const express = require("express");
const app = express();
const http = require("http").Server(app);
const socket = require("socket.io")(http)
const url = process.env.PORT || 3000;

var usuarios = []

http.listen(3000,function(){
    console.log("Server iniciado:",3000)
});

app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/index.html");
});

socket.on("connection",function(io){
    io.on("mensaje",function(msg){
        usuarios.push({id:msg})
        console.log(usuarios)
        socket.emit("mensaje",usuarios)
    });
});

 