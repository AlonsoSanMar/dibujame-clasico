// Exporta funciones para interactuar con el canvas

export function obtenerPosicion(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return { x, y };
}

export function dibujar(canvas, ctx, e) {
    const { x, y } = obtenerPosicion(canvas, e);
    const tamGrueso = document.getElementById('tamPincel').value;
    const color = document.getElementById('colorSelect').value;
    
    ctx.fillStyle = color;
    ctx.fillRect(x, y, tamGrueso, tamGrueso);
}

export function previsualizarRecta(canvas, ctx, imgGuardada, puntoInicio, e) {
    ctx.putImageData(imgGuardada, 0, 0);
    const { x: xFin, y: yFin } = obtenerPosicion(canvas, e);
    ctx.beginPath();
    ctx.moveTo(puntoInicio.x, puntoInicio.y);
    ctx.lineTo(xFin, yFin);
    ctx.strokeStyle = document.getElementById('colorSelect').value;
    ctx.lineWidth = document.getElementById('tamPincel').value;
    ctx.stroke();
    ctx.closePath();
}

export function dibujaRecta(canvas, ctx, puntoInicio, e) {
    const { x: xFin, y: yFin } = obtenerPosicion(canvas, e);
    ctx.beginPath();
    ctx.moveTo(puntoInicio.x, puntoInicio.y);
    ctx.lineTo(xFin, yFin);
    ctx.strokeStyle = document.getElementById('colorSelect').value;
    ctx.lineWidth = document.getElementById('tamPincel').value;
    ctx.stroke();
    ctx.closePath();
}


//Cuadrado

export function previsualizarCuadrado(canvas, ctx, imgGuardada, puntoInicio, e) {
    ctx.putImageData(imgGuardada, 0, 0);
    ctx.lineCap = 'square';

    const { x: xFin, y: yFin } = obtenerPosicion(canvas, e);

    ctx.beginPath();
    ctx.moveTo(puntoInicio.x, puntoInicio.y);
    ctx.lineTo(xFin, puntoInicio.y);
    
    ctx.lineTo(xFin, yFin);
    
    ctx.lineTo(puntoInicio.x, yFin);
    
    ctx.lineTo(puntoInicio.x, puntoInicio.y);
    
    ctx.strokeStyle = document.getElementById('colorSelect').value;
    ctx.lineWidth = document.getElementById('tamPincel').value;
    ctx.fillStyle = document.getElementById('rellenoSelect').value;

    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

export function dibujaCuadrado(canvas, ctx, puntoInicio, e) {
    const { x: xFin, y: yFin } = obtenerPosicion(canvas, e);

    ctx.beginPath();
    ctx.moveTo(puntoInicio.x, puntoInicio.y);
    ctx.lineTo(xFin, puntoInicio.y);
    
    ctx.lineTo(xFin, yFin);
    
    ctx.lineTo(puntoInicio.x, yFin);
    
    ctx.lineTo(puntoInicio.x, puntoInicio.y);
    
    ctx.strokeStyle = document.getElementById('colorSelect').value;
    ctx.lineWidth = document.getElementById('tamPincel').value;
    ctx.fillStyle = document.getElementById('rellenoSelect').value;

    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}


// Circulo

function calcularRadio(punto1, punto2) {
    const dx = punto2.x - punto1.x;
    const dy = punto2.y - punto1.y;
    return Math.sqrt(dx * dx + dy * dy);
}


export function previsualizarCirculo(canvas, ctx, imgGuardada, puntoInicio, e) {
    ctx.putImageData(imgGuardada, 0, 0);
    const { x: xFin, y: yFin } = obtenerPosicion(canvas, e);

    ctx.beginPath();

    ctx.arc(puntoInicio.x, puntoInicio.y, calcularRadio(puntoInicio,{x: xFin, y: yFin}), 0, 2 * Math.PI);

    ctx.strokeStyle = document.getElementById('colorSelect').value;
    ctx.lineWidth = document.getElementById('tamPincel').value;
    ctx.fillStyle = document.getElementById('rellenoSelect').value;

    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

export function dibujaCirculo(canvas, ctx, puntoInicio, e) {
    const { x: xFin, y: yFin } = obtenerPosicion(canvas, e);

    ctx.beginPath();

    ctx.arc(puntoInicio.x, puntoInicio.y, calcularRadio(puntoInicio,{x: xFin, y: yFin}), 0, 2 * Math.PI);

    ctx.strokeStyle = document.getElementById('colorSelect').value;
    ctx.lineWidth = document.getElementById('tamPincel').value;
    ctx.fillStyle = document.getElementById('rellenoSelect').value;

    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}


// Texto
export function dibujaTexto(canvas, ctx, puntoInicio){
        const input = document.createElement('input');
        input.type = 'text';
        input.style.position = 'absolute';
        input.style.left = puntoInicio.x + canvas.getBoundingClientRect().left + "px";
        input.style.top = puntoInicio.y + canvas.getBoundingClientRect().top + "px";
        input.style.fontSize = '16px';
        document.body.appendChild(input);

        input.focus();
    
        input.addEventListener('blur', () => {
            const text = input.value;
            if (text) {                
                ctx.font = `${document.getElementById('fuenteSize').value}px Arial`;
                ctx.fillStyle = document.getElementById('colorSelect').value; 
                ctx.fillText(text, puntoInicio.x, puntoInicio.y);
            }
            document.body.removeChild(input);
        });
    
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                input.blur(); 
            }
        })
}