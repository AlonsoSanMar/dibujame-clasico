import { descargarCanvasComoJPEG } from './descargarCanvas.js';
import { redimenzionarCanvas } from './redimenzionarCanvas.js';


const canvas = document.getElementById("canvasBoard");
const ctx = canvas.getContext("2d");
const resizeHandle = document.getElementById('resizeHandle');

ctx.fillRect(0, 0, 800, 600);

let dibuja = false;
let tamGrueso = 10;
let color = document.getElementById('colorSelect').value;
let imgUndo = ctx.getImageData(0, 0, canvas.width, canvas.height);

//FIGURAS
let imgGuardada =  null;
let puntoInicio = null;
let recta = false;

// Lógica para redimensionar el canvas
redimenzionarCanvas(canvas, ctx, resizeHandle);
//-----------------------------------------------------------------------------

// Logica para dibujar

document.getElementById("canvasBoard").addEventListener('mousedown', (e) => {
    if(recta){
        if(puntoInicio === null){
            puntoInicio = obtenerPosicion(e); 
            imgGuardada = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }else {
            dibujaRecta(e);
            puntoInicio = null;
            imgGuardada = null;
        }
    }else{
        dibuja = !dibuja;
    }
    imgUndo = ctx.getImageData(0, 0, canvas.width, canvas.height);
})

canvas.addEventListener('mouseup', () => {
    dibuja = false;
    if (recta && puntoInicio !== null) {
        puntoInicio = null;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (dibuja) {
        dibujar(e);
    } else if (recta && puntoInicio !== null) {
        previsualizarRecta(e);
    }
});

//------------------------------------------------------------------

function obtenerPosicion(e){
    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return {x, y};
}

function dibujar(e) {
    const {x, y} = obtenerPosicion(e);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, tamGrueso, tamGrueso);
}

function previsualizarRecta(e){
    ctx.putImageData(imgGuardada, 0, 0);

    const {x: xFin, y: yFin} = obtenerPosicion(e);
    ctx.beginPath();
    ctx.moveTo(puntoInicio.x, puntoInicio.y);
    ctx.lineTo(xFin, yFin);
    ctx.strokeStyle = color;
    ctx.lineWidth = tamGrueso;
    ctx.stroke();
    ctx.closePath();
}

function dibujaRecta(e){
    const {x: xFin, y: yFin} = obtenerPosicion(e);

    ctx.beginPath();
    ctx.moveTo(puntoInicio.x, puntoInicio.y);
    ctx.lineTo(xFin, yFin);
    ctx.strokeStyle = color;
    ctx.lineWidth = tamGrueso;
    ctx.stroke();
    ctx.closePath();

}


//funciones para modificar opciones
document.getElementById("tamPincel").addEventListener('input', (e) => {
    tamGrueso = e.target.value;
    document.getElementById('display-tam').innerHTML = "Tamaño: " + tamGrueso;
});

// Seleccion de color
document.getElementById('colorSelect').addEventListener('change', () => {
    color = document.getElementById('colorSelect').value;
});

// funciones para dibujar las figuras
document.getElementById('lineaRecta').addEventListener('click',()=> {
    recta = !recta;
    if(recta){
        document.getElementById('lineaRecta').classList.add('active');
    }else{
        document.getElementById('lineaRecta').classList.remove('active');
    }
})

//Limpiar el canvas
document.getElementById('limpia').addEventListener('click', () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})

//UNDO
document.getElementById('undo').addEventListener('click', () => {
    ctx.putImageData(imgUndo,0,0);
})

//display de datos
document.getElementById('display-tam').innerHTML += tamGrueso;


// Ejemplo de cómo llamar a la función de descarga
document.getElementById('btnDescargar').addEventListener('click', () => {
    descargarCanvasComoJPEG(canvas);
});