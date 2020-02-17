import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Styles } from '../../types';
import { Texture } from 'three';

const TEXTURE_SIZE = 32;

interface Props {
    setCubeTexture: (ctx: CanvasRenderingContext2D) => void;
}

const styles: Styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    canvas: {
        width: 128,
        height: 128,
        imageRendering: 'pixelated',
    }
}

export const TextureEditor: React.FC<Props> = (props) => {
    const {
        setCubeTexture,
    } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [drawing, setDrawing] = useState(false);

    const draw = useCallback((e: MouseEvent) => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            if(!ctx) {
                return;
            }

            if (drawing) {
                ctx.moveTo((e.offsetX - e.movementX) / 4, (e.offsetY - e.movementY) / 4);
                ctx.lineTo(e.offsetX / 4, e.offsetY / 4);
            }
            ctx.stroke();
        }
    }, [canvasRef, drawing]);

    const startDraw = useCallback(() => { setDrawing(true) }, []);
    const endDraw = useCallback(() => { 
        setDrawing(false);

        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                setCubeTexture(ctx);
            }
        }
     }, [canvasRef]);

    useEffect(() => {
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            if(!ctx) {
                return;
            }

            ctx.fillStyle = 'black';
            ctx.strokeStyle = 'red';
            ctx.fillRect(0,0,TEXTURE_SIZE,TEXTURE_SIZE);

            canvasRef.current.addEventListener('mousemove', draw);
            canvasRef.current.addEventListener('mousedown', startDraw);
            canvasRef.current.addEventListener('mouseup', endDraw);
        }

        return () => {
            if(canvasRef.current) {
                canvasRef.current.removeEventListener('mousemove', draw);
                canvasRef.current.removeEventListener('mousedown', startDraw);
                canvasRef.current.removeEventListener('mouseup', endDraw);

                const ctx = canvasRef.current.getContext('2d');

                ctx && ctx.stroke();
            }
        }
    }, [canvasRef, startDraw, endDraw, draw]);

    return (
        <div style={styles.mainContainer}>
            <canvas style={styles.canvas} width={TEXTURE_SIZE} height={TEXTURE_SIZE} ref={canvasRef}/>
        </div>
    )
}