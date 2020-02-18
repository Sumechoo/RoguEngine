import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Styles } from '../../types';
import { Texture, CanvasTexture, TextureFilter, NearestFilter } from 'three';

const TEXTURE_SIZE = 32;

interface Props {
    setCubeTexture: (ctx: Texture) => void;
}

interface PaletteProps {
    setColor: (newColor: string) => void;
}

const styles: Styles = {
    palleteContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 128,
    },
    canvas: {
        width: 128,
        height: 128,
        imageRendering: 'pixelated',
        backgroundColor: 'black',
    }
}

const colors: ReadonlyArray<string> = ['lightblue', 'lightcoral', 'white', 'orange'];

export const Palette: React.FC<PaletteProps> = (props) => {
    const {setColor} = props;

    return(
        <div style={styles.palleteContainer}>
            {colors.map((color) => <button key={color} onClick={() => setColor(color)} style={{backgroundColor: color}}>{color}</button>)}
        </div>
    ) 
}

export const TextureEditor: React.FC<Props> = (props) => {
    const {
        setCubeTexture,
    } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [drawing, setDrawing] = useState(false);
    const [color, setColor] = useState('white');

    const draw = useCallback((e: MouseEvent) => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            if(!ctx) {
                return;
            }

            if (drawing) {
                ctx.fillStyle = color;

                ctx.fillRect(e.offsetX / 4, e.offsetY / 4, 1, 1);

                const texture = new CanvasTexture(canvasRef.current);
                texture.magFilter = NearestFilter;

                setCubeTexture(texture);
            }
            ctx.fill();
        }
    }, [canvasRef, drawing]);

    const startDraw = useCallback(() => { setDrawing(true) }, [canvasRef]);
    const endDraw = useCallback(() => { setDrawing(false) }, [canvasRef]);

    useEffect(() => {
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            if(!ctx) {
                return;
            }

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
            <Palette setColor={setColor}/>
        </div>
    )
}