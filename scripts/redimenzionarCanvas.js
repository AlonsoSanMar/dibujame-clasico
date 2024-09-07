export function redimenzionarCanvas(canvas, ctx, resizeHandle){
    let isResizing = false;
    let startWidth, startHeight, startX, startY;

    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = canvas.width;
        startHeight = canvas.height;
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (isResizing) {
            const newWidth = startWidth + (e.clientX - startX);
            const newHeight = startHeight + (e.clientY - startY);
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.fillRect(0, 0, newWidth, newHeight);
        }
    });

    window.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
        }
    });
}