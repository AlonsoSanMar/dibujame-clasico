import { descargarCanvasComoJPEG } from './descargarCanvas.js';
import { redimenzionarCanvas } from './redimenzionarCanvas.js';
import * as util from './utilsDibujar.js';


const canvas = document.getElementById("canvasBoard");

if(window.innerWidth < 769){
    canvas.width = window.innerWidth;
} else {
    canvas.width = window.innerWidth - 500;
}

const ctx = canvas.getContext("2d");
const resizeHandle = document.getElementById('resizeHandle');

ctx.fillRect(0, 0, canvas.width, 550);

let dibuja = false;
let tamGrueso = 10;
let color = document.getElementById('colorSelect').value;
let imgUndo = [ctx.getImageData(0, 0, canvas.width, canvas.height)];

//FIGURAS
let imgGuardada =  null;
let puntoInicio = null;
let libre = document.getElementById('dibujoLibre');
let recta = document.getElementById('lineaRecta');
let cuadrado = document.getElementById('cuadrado');
let circulo = document.getElementById('circulo');
let texto = document.getElementById('texto');

// Lógica para redimensionar el canvas
redimenzionarCanvas(canvas, ctx, resizeHandle);
//-----------------------------------------------------------------------------

// Logica para dibujar

const startEvent = (e) => {
    let event = e.type.includes('touch') ? e.touches[0] : e;
    if(libre.classList.contains('active')){
        dibuja = !dibuja;
    } else if(recta.classList.contains('active')){
        if(puntoInicio === null){
            puntoInicio = util.obtenerPosicion(canvas, event); 
            imgGuardada = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } else {
            util.dibujaRecta(canvas, ctx, puntoInicio, event);
            puntoInicio = null;
            imgGuardada = null;
        }
    } else if(cuadrado.classList.contains('active')){
        if(puntoInicio === null){
            puntoInicio = util.obtenerPosicion(canvas, event); 
            imgGuardada = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } else {
            util.dibujaCuadrado(canvas, ctx, puntoInicio, event);
            puntoInicio = null;
            imgGuardada = null;
        }
    } else if(circulo.classList.contains('active')){
        if(puntoInicio === null){
            puntoInicio = util.obtenerPosicion(canvas, event); 
            imgGuardada = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } else {
            util.dibujaCirculo(canvas, ctx, puntoInicio, event);
            puntoInicio = null;
            imgGuardada = null;
        }
    } else if(texto.classList.contains('active')){
        puntoInicio = util.obtenerPosicion(canvas, event); 
    }
    imgUndo.unshift(ctx.getImageData(0, 0, canvas.width, canvas.height));
};

const endEvent = () => {
    dibuja = false;
    if (texto.classList.contains('active') && puntoInicio !== null) {
        util.dibujaTexto(canvas, ctx, puntoInicio);
        puntoInicio = null;
    }
    puntoInicio = null;
};

const moveEvent = (e) => {
    let event = e.type.includes('touch') ? e.touches[0] : e;
    if (dibuja) {
        util.dibujar(canvas, ctx, event);
    } else if (recta.classList.contains('active') && puntoInicio !== null) {
        util.previsualizarRecta(canvas, ctx, imgGuardada, puntoInicio, event);
    } else if (cuadrado.classList.contains('active') && puntoInicio !== null) {
        util.previsualizarCuadrado(canvas, ctx, imgGuardada, puntoInicio, event);
    } else if (circulo.classList.contains('active') && puntoInicio !== null){
        util.previsualizarCirculo(canvas, ctx, imgGuardada, puntoInicio, event);
    }
};

// Agrega los listeners para mouse y touch
canvas.addEventListener('mousedown', startEvent);
canvas.addEventListener('touchstart', startEvent);

canvas.addEventListener('mouseup', endEvent);
canvas.addEventListener('touchend', endEvent);

canvas.addEventListener('mousemove', moveEvent);
canvas.addEventListener('touchmove', moveEvent);


//------------------------------------------------------------------


//funciones para modificar opciones
document.getElementById("tamPincel").addEventListener('input', (e) => {
    tamGrueso = e.target.value;
    document.getElementById('display-tam').innerHTML = "Tamaño: " + tamGrueso;
});

// Seleccion de color
document.getElementById('colorSelect').addEventListener('change', () => {
    color = document.getElementById('colorSelect').value;
});

const figuras = document.getElementsByClassName('figuras');
// funciones para dibujar las figuras
function limpiaSelecciones(actual){
    for (let i = 0; i < figuras.length; i++) {
        if(actual !== figuras[i]){
            figuras[i].classList.remove("active");
        }
    }
}

document.getElementById('dibujoLibre').addEventListener('click',()=> {
    if(!libre.classList.contains('active')){
        libre.classList.add('active');
        limpiaSelecciones(libre);
    }else{
        libre.classList.remove('active');
    }
})

document.getElementById('lineaRecta').addEventListener('click',()=> {
    if(!recta.classList.contains('active')){
        recta.classList.add('active');
        limpiaSelecciones(recta);
    }else{
        recta.classList.remove('active');
    }
})


document.getElementById('cuadrado').addEventListener('click',()=> {
    if(!cuadrado.classList.contains('active')){
        cuadrado.classList.add('active');
        limpiaSelecciones(cuadrado);
    }else{
        cuadrado.classList.remove('active');
    }
})

document.getElementById('circulo').addEventListener('click',()=> {
    if(!circulo.classList.contains('active')){
        circulo.classList.add('active');
        limpiaSelecciones(circulo);
    }else{
        circulo.classList.remove('active');
    }
})

document.getElementById('texto').addEventListener('click',()=> {
    if(!texto.classList.contains('active')){
        texto.classList.add('active');
        limpiaSelecciones(texto);
    }else{
        texto.classList.remove('active');
    }
})


//Limpiar el canvas
document.getElementById('limpia').addEventListener('click', () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})

//UNDO
document.getElementById('undo').addEventListener('click', () => {
    if(imgUndo.length > 0){
        ctx.putImageData(imgUndo.shift(),0,0);
    }
})

//display de datos
document.getElementById('display-tam').innerHTML += tamGrueso;


// Ejemplo de cómo llamar a la función de descarga
document.getElementById('btnDescargar').addEventListener('click', () => {
    descargarCanvasComoJPEG(canvas);
});