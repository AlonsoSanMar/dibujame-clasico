import * as util from './utilsDibujar.js';

export function dibujarCanvas(canvas, ctx, state) {
    const { recta, imgUndo, dibuja, puntoInicio, imgGuardada } = state;

    canvas.addEventListener('mousedown', (e) => {
        if (recta) {
            if (puntoInicio === null) {
                state.puntoInicio = util.obtenerPosicion(canvas, e);
                state.imgGuardada = ctx.getImageData(0, 0, canvas.width, canvas.height);
            } else {
                util.dibujaRecta(canvas, ctx, state.puntoInicio, e);
                state.puntoInicio = null;
                state.imgGuardada = null;
            }
        } else {
            state.dibuja = !state.dibuja;
        }
        state.imgUndo = ctx.getImageData(0, 0, canvas.width, canvas.height);
    });

    canvas.addEventListener('mouseup', () => {
        state.dibuja = false;
        if (recta && state.puntoInicio !== null) {
            state.puntoInicio = null;
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (state.dibuja) {
            util.dibujar(canvas, ctx, e);
        } else if (recta && state.puntoInicio !== null) {
            util.previsualizarRecta(canvas, ctx, state.imgGuardada, state.puntoInicio, e);
        }
    });
}
