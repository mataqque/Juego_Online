var socket = io();

var usuario;
var usuarios = document.getElementsByClassName("datos")[0];
var configuracion = {id:""};
// movimiento del cuadrado 
var movimiento = "";
var arriba = 0;abajo = 0;derecha = 0;izquierda = 0;
var num = 4;
var cuadrado = document.getElementsByClassName("cuadrado")[0];
var alimento_x = 0
var alimento_y = 0

document.addEventListener("keyup",function(key){
    movimiento = key.key;
    if(movimiento == "ArrowUp"){
        let posicion_top = cuadrado.style.top = cordenada_arriba()+"px";
        colision(posicion_top);
    }else if(movimiento == "ArrowDown"){
        let posicion_top = cuadrado.style.top = cordenada_abajo()+"px";
        colision(posicion_top);
    }else if(movimiento == "ArrowLeft"){
        let posicion_top = cuadrado.style.left = cordenada_izquierda()+"px";
        colision(posicion_top);
    }else if(movimiento == "ArrowRight"){
        let posicion_top= cuadrado.style.left = cordenada_derecha()+"px";
        colision(posicion_top);
    }
});

function cordenada_abajo(){ abajo = abajo + num ;arriba = abajo; return abajo;}
function cordenada_arriba(){ arriba = arriba - num ; abajo = arriba; return arriba;}
function cordenada_izquierda(){ izquierda = izquierda - num ; derecha = izquierda;return izquierda;}
function cordenada_derecha(){ derecha = derecha + num ; izquierda = derecha; return derecha;}

function colision(posicion_top){
    let arriba_colision = alimento_y - cuadrado.getBoundingClientRect().height;
    let arriba_colision1 =  alimento_y + 14;
    let left_colision = alimento_x - cuadrado.getBoundingClientRect().width;
    let left_colision1 = alimento_x + 14; 
    
    if( derecha > left_colision && derecha < left_colision1 && arriba > arriba_colision && arriba < arriba_colision1 ){
        let width1 = cuadrado.getBoundingClientRect().width;
        let height1 =cuadrado.getBoundingClientRect().height;
        cuadrado.style.width = width1+3+"px";
        cuadrado.style.height = height1+3+"px"
        posicion_azar();
    }else{
        alimento.style.background = "black";
    }
    
}
// posicion al azar del alimento

var  alimento = document.getElementsByClassName("alimento")[0];
function posicion_azar(){
    let x = (document.getElementsByClassName("game")[0].getBoundingClientRect().width)-20; //limite para pasar
    let y = (document.getElementsByClassName("game")[0].getBoundingClientRect().height)-35; //limete para pasar
    alimento_x = Math.floor(Math.random()*x);
    alimento_y = Math.floor(Math.random()*y);

    alimento.style.top = (alimento_y)+"px";
    alimento.style.left = (alimento_x)+"px";
}
posicion_azar();

// connecion usuario 

document.getElementById("enviar").addEventListener("click",function(event){
    usuario = document.getElementById("id_usuario").value;
    document.getElementById("id_usuario1").textContent = usuario+` : `;
    event.preventDefault();
    configuracion.id = usuario;
    llamada_socket();
});

socket.on("mensaje",function(msg){
    nuevo_participante(msg);
});

function llamada_socket(){
    socket.emit("mensaje",configuracion);
    console.log(configuracion)
    socket.on("mensaje",function(msg){
        console.log(msg)
        nuevo_participante(msg);
    });
}
function nuevo_participante(datos){
    console.log(datos)
    for(let i = 0;i<1;i++){
        usuarios.innerHTML = `<div>
        <span id="id_usuario1">${datos.id} : </span><span id="puntaje1">1000</span>
    </div>`
    }
}