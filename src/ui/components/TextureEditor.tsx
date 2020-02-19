import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Styles } from '../../types';
import { Texture, CanvasTexture, NearestFilter } from 'three';

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

function doActionWithContext(
    ref: React.RefObject<HTMLCanvasElement>,
    callback: (ctx: CanvasRenderingContext2D, el: HTMLCanvasElement) => void)
{
    if(ref.current) {
        const ctx = ref.current.getContext('2d');
        if(ctx) {
            callback(ctx, ref.current);
        }
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
        doActionWithContext(canvasRef, (ctx) => {
            if (drawing) {
                ctx.fillStyle = color;

                ctx.fillRect(e.offsetX / 4, e.offsetY / 4, 1, 1);

                const texture = new CanvasTexture(ctx.canvas);
                texture.magFilter = NearestFilter;

                setCubeTexture(texture);
            }
            ctx.fill();
        });
    }, [canvasRef, drawing, color, setCubeTexture]);

    const startDraw = useCallback(() => { setDrawing(true) }, []);
    const endDraw = useCallback(() => { setDrawing(false) }, []);

    useEffect(() => {
        doActionWithContext(canvasRef, (ctx, el) => {
            el.addEventListener('mousemove', draw);
            el.addEventListener('mousedown', startDraw);
            el.addEventListener('mouseup', endDraw);
        });
        return () => {
            doActionWithContext(canvasRef, (ctx, el) => {
                el.removeEventListener('mousemove', draw);
                el.removeEventListener('mousedown', startDraw);
                el.removeEventListener('mouseup', endDraw);

                ctx && ctx.stroke();
            })
        }
    }, [canvasRef, startDraw, endDraw, draw]);

    return (
        <div style={styles.mainContainer}>
            <canvas style={styles.canvas} width={TEXTURE_SIZE} height={TEXTURE_SIZE} ref={canvasRef}/>
            <Palette setColor={setColor}/>
        </div>
    )
}