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
