const express = require("express");
const app = express();
const http = require("http").Server(app);
const socket = require("socket.io")(http)
const url = process.env.PORT || 3000;

var usuarios = []
var configuracion = [];
var valor = true;
var contenedor = [];

// configuracion = [{id: "juan", puntaje: 0, pelota: "juan"},{id: "renzo", puntaje: 0, pelota: "juan"},{id: "alex", puntaje: 0, pelota: "juan"}]
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
        socket.emit("mensaje",usuarios);
    });
});

socket.on("connection",function(io){
    io.on("envio de datos",function(msg){
        contenedor = configuracion;
        if(configuracion.length == 0){
            configuracion = msg
            contenedor = msg
       }else if(configuracion.length>0){
            for(var i=0;configuracion.length>i;i++){
              if(msg[0].id == configuracion[i].id){
                   console.log("usuario existe------");
                   contenedor[i] = msg[0];
                   valor = false;
              }
            }
            if(valor == true){
                console.log("prueba ")
                contenedor.push(msg[0]);
            }
            valor = true;
            configuracion = contenedor;
            console.log(configuracion);
       }
       io.broadcast.emit("envio de datos",configuracion);
    });
});

socket.on("connection",function(io){
    io.on("pruebaFlavio",function(msg){
        io.broadcast.emit("pruebaFlavio",msg);
    });
})