import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Styles } from '../../types';

const TEXTURE_SIZE = 32;

interface Props {
    setCubeColor: (color: number) => void;
}

const styles: Styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    canvas: {
        // width: 100,
        // height: 100,
    }
}

export const TextureEditor: React.FC<Props> = (props) => {
    const {
        setCubeColor,
    } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const setRandomColor = useCallback(() => {
        setCubeColor(Math.random() * 16777215);
    }, []);
    const [drawing, setDrawing] = useState(false);

    const draw = (e: MouseEvent) => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            if(!ctx) {
                return;
            }

            ctx.moveTo(e.offsetX - e.movementX, e.offsetY - e.movementY);
            ctx.lineTo(e.offsetX, e.offsetY);

            if (drawing) {
                ctx.stroke();
            }

            console.info('drawing?:', drawing);
        }
    };

    const startDraw = useCallback(() => { setDrawing(true) }, [setDrawing]);
    const endDraw = useCallback(() => { setDrawing(false) }, [setDrawing]);

    useEffect(() => {
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            if(!ctx) {
                return;
            }

            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'red';
            ctx.fillRect(0,0,TEXTURE_SIZE,TEXTURE_SIZE);

            canvasRef.current.addEventListener('mousemove', draw);
            canvasRef.current.addEventListener('mousedown', startDraw);
            canvasRef.current.addEventListener('mouseup', endDraw);
        }
    }, [canvasRef, startDraw, drawing]);

    return (
        <div style={styles.mainContainer}>
            <button onClick={setRandomColor}>Set random color</button>
            <canvas style={styles.canvas} width={TEXTURE_SIZE} height={TEXTURE_SIZE} ref={canvasRef}/>
        </div>
    )
}