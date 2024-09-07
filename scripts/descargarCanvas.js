export function descargarCanvasComoJPEG(canvas) {
    const dataURL = canvas.toDataURL('image/jpeg');
    
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.jpg';
    
    link.click();
}
