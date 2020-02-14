import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Styles } from '../../types';
import { CanvasTexture, Texture, NearestFilter } from 'three';

const TEXTURE_SIZE = 32;

interface Props {
    setCubeColor: (color: number) => void;
    setCubeTexture: (texture: Texture) => void;
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
    }
}

export const TextureEditor: React.FC<Props> = (props) => {
    const {
        setCubeColor,
        setCubeTexture,
    } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const setRandomColor = useCallback(() => {
        setCubeColor(Math.random() * 16777215);
    }, []);
    const [drawing, setDrawing] = useState(false);

    const [texture, setTexture] = useState<CanvasTexture | undefined>();

    const draw = (e: MouseEvent) => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            if(!ctx) {
                return;
            }

            ctx.moveTo((e.offsetX - e.movementX) / 4, (e.offsetY - e.movementY) / 4);
            ctx.lineTo(e.offsetX / 4, e.offsetY / 4);

            if (drawing && texture) {
                ctx.stroke();
        
                texture.needsUpdate = true;
            }
        }
    };

    const startDraw = useCallback(() => { setDrawing(true) }, [setDrawing]);
    const endDraw = () => { 
        setDrawing(false);
        if(texture) {
            setCubeTexture(texture);
        }
    };

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

            const newTexture = new CanvasTexture(ctx.canvas);

            newTexture.magFilter = NearestFilter;

            setTexture(newTexture);

            newTexture.needsUpdate = true;
        }
    }, [canvasRef, startDraw, drawing]);

    return (
        <div style={styles.mainContainer}>
            <canvas style={styles.canvas} width={TEXTURE_SIZE} height={TEXTURE_SIZE} ref={canvasRef}/>
        </div>
    )
}