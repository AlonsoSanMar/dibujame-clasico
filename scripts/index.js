import { descargarCanvasComoJPEG } from './descargarCanvas.js';
import { redimenzionarCanvas } from './redimenzionarCanvas.js';
import * as util from './utilsDibujar.js';


const canvas = document.getElementById("canvasBoard");

if(window.innerWidth < 769){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
} else {
    canvas.width = window.innerWidth - 400;
    canvas.height = 550;
}

const ctx = canvas.getContext("2d");
const resizeHandle = document.getElementById('resizeHandle');

ctx.fillRect(0, 0, canvas.width, canvas.height);

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
let seleccionar = document.getElementById('seleccionar');

// Lógica para redimensionar el canvas
redimenzionarCanvas(canvas, ctx, resizeHandle);
//-----------------------------------------------------------------------------

// Logica para dibujar

const startEvent = (e) => {
    e.preventDefault();
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

const endEvent = (e) => {
    e.preventDefault();
    dibuja = false;
    if (texto.classList.contains('active') && puntoInicio !== null) {
        util.dibujaTexto(canvas, ctx, puntoInicio);
        puntoInicio = null;
    }
    puntoInicio = null;
};

const moveEvent = (e) => {
    e.preventDefault();
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
        libre.classList.toggle('active');
        limpiaSelecciones(libre);
})

document.getElementById('lineaRecta').addEventListener('click',()=> {
        recta.classList.toggle('active');
        limpiaSelecciones(recta);
})


document.getElementById('cuadrado').addEventListener('click',()=> {
        cuadrado.classList.toggle('active');
        limpiaSelecciones(cuadrado);
})

document.getElementById('circulo').addEventListener('click',()=> {
        circulo.classList.toggle('active');
        limpiaSelecciones(circulo);
})

document.getElementById('texto').addEventListener('click',()=> {
        texto.classList.toggle('active');
        limpiaSelecciones(texto);
})

document.getElementById('seleccionar').addEventListener('click',()=> {
        seleccionar.classList.toggle('active');
        limpiaSelecciones(seleccionar);
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


// Para subir imagenes
const loadImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const maxHeight = 550;
            const aspectRatio = img.width / img.height;
            
            let newWidth = canvas.width;
            let newHeight = canvas.height;

            if (img.height > maxHeight) {
                newHeight = maxHeight;
                newWidth = newHeight * aspectRatio;
            }

            canvas.width = newWidth;
            canvas.height = newHeight;


            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
};

document.getElementById('file-input').addEventListener('change', loadImage);
