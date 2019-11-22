var socket = io();

var usuario; // guardar usuario actual;
var usuarios = document.getElementsByClassName("datos")[0];
var configuracion = [{id:"",puntaje:"",pelota:["",""],usuariopelota:[0,0]}];
var puntaje1 = document.getElementById("puntaje1");
var puntaje2 = 0;
// movimiento del cuadrado 
var movimiento = "";
var arriba = 0;abajo = 0;derecha = 0;izquierda = 0;
var num = 4;
var cuadrado = document.getElementsByClassName("cuadrado")[0];
var alimento_x = 0
var alimento_y = 0
var coordenadax = 0
var coordenaday = 0

document.addEventListener("keyup",function(key){
    movimiento = key.key;
    if(movimiento == "ArrowUp"){
        let posicion_top = cuadrado.style.top = cordenada_arriba()+"px";
        obtenerposicion()
        colision(posicion_top);
    }else if(movimiento == "ArrowDown"){
        let posicion_top = cuadrado.style.top = cordenada_abajo()+"px";
        obtenerposicion()
        colision(posicion_top);
    }else if(movimiento == "ArrowLeft"){
        let posicion_top = cuadrado.style.left = cordenada_izquierda()+"px";
        obtenerposicion();
        colision(posicion_top);
    }else if(movimiento == "ArrowRight"){
        let posicion_top= cuadrado.style.left = cordenada_derecha()+"px";
        obtenerposicion()
        colision(posicion_top);
    }
});
function obtenerposicion(){
    coordenaday = cuadrado.style.top
    coordenadax = cuadrado.style.left
}

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
        cuadrado.style.height = height1+3+"px";
        posicion_azar();
        configuracion[0].id = usuario;
        configuracion[0].puntaje = puntaje2;
        configuracion[0].pelota = [alimento_x,alimento_y];
        configuracion[0].usuariopelota = [coordenadax,coordenaday];
        
        enviar_datos(configuracion)
        
    }else{
        configuracion[0].id = usuario;
        configuracion[0].puntaje = puntaje2;
        configuracion[0].pelota = [alimento_x,alimento_y];
        configuracion[0].usuariopelota = [coordenadax,coordenaday]
      
        enviar_datos(configuracion)
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
    if(document.getElementById("puntaje1")){
        let puntaje1 = document.getElementById("puntaje1");
        puntaje1.textContent = parseInt(puntaje1.textContent)+5;
        puntaje2 =  parseInt(document.getElementById("puntaje1").textContent)
        socket.emit("sumar puntuacion",puntaje1.textContent);
    }
}

// connecion usuario 

document.getElementById("enviar").addEventListener("click",function(event){
    usuario = document.getElementById("id_usuario").value;
    event.preventDefault();
    document.getElementById("formulario").style.display = "none";
    llamada_socket(usuario);
    posicion_azar();
});

// socket.on("mensaje",function(msg){
//     nuevo_participante(msg);
// });
function llamada_socket(usuario){
    socket.emit("mensaje",usuario);
}
    socket.on("mensaje",function(msg){
        nuevo_participante(msg);
        });

var  guardar_inner; 
function nuevo_participante(datos){
    usuarios.innerHTML = "";
    for(let i = 0;i<datos.length;i++){
    
        usuarios.innerHTML += `<div>
        <span id="id_usuario1">${datos[i].id} : </span><span id="puntaje1">0</span>
    </div>`;
    }
}
 
// conectando la puntuacion 
socket.on("sumar puntuacion",function(msg){
    if(document.getElementById("puntaje1")){
        document.getElementById("puntaje1").textContent = msg
    }
});

// envio de nombre/ puntaje / coordendas  ;
function enviar_datos(config){
    socket.emit("envio de datos", config);
}

socket.on("envio de datos",function(msg){
    console.log(msg)
    if(msg.length > 1){
        for(let i=0;msg.length>i;i++){
            if(document.getElementsByClassName("jugador "+i)[0]){
                let cambiarpelota = document.getElementsByClassName("jugador "+i)[0]
                document.getElementsByClassName("jugador "+i)[0].style.top = msg[i].usuariopelota[1]
                document.getElementsByClassName("jugador "+i)[0].style.left = msg[i].usuariopelota[0]
            }
            if(!document.getElementsByClassName("jugador "+i)[0]){
                let elemento = document.createElement("div");
                elemento.className = "jugador "+i;
                elemento.style.top = msg[i].usuariopelota[1]
                elemento.style.left = msg[i].usuariopelota[0]
                document.getElementsByClassName("game")[0].appendChild(elemento);
                
                }
            }
    }
    
});