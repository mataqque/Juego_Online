var socket = io();
// console.log(socket)

socket.emit("mensaje","hola");
socket.on("mensaje",function(msg){
    console.log(msg)
})

// movimiento del cuadrado 
var movimiento = "";
var arriba = 0;abajo = 0;derecha = 0;izquierda = 0;
var num = 10;
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
    let arriba_colision = alimento_y -14;
    let arriba_colision1 =  alimento_y + 14;
    let left_colision = alimento_x - 14;
    let left_colision1 = alimento_x + 14;

    console.log(derecha)
    console.log(left_colision) 
    
    if( derecha > left_colision && derecha < left_colision1 && arriba > arriba_colision && arriba < arriba_colision1 ){
        let width1 =cuadrado.getBoundingClientRect().width;
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
    let x = (document.getElementsByClassName("game")[0].getBoundingClientRect().width)-20;
    let y = (document.getElementsByClassName("game")[0].getBoundingClientRect().height)-35;
    alimento_x = Math.random()*x;
    alimento_y = Math.random()*y
    console.log(`width: ${x} \n height:${y}`)
    // alimento.style.top = 50+"px";
    // alimento.style.left = 20+"px";
    alimento.style.top = (alimento_y)+"px";
    alimento.style.left = (alimento_x)+"px";
}
posicion_azar();