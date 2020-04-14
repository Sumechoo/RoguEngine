import { TileConfigArray, Builder } from "./types";
import { ASSETS } from "../../../assets/sprites";

export const concrette: Builder = () => {
    return [
        {
            material: ASSETS.bricks,
        }
    ]
}

export const basicWall: Builder = () => {
    return [
        {
            material: ASSETS.window,
        }
    ]
}

export const stack = (builder: Builder, depth = 3, helmet?: Builder) => {
    let i = 0;

    depth++;
    
    const base = builder();
    const recursor = (target: TileConfigArray) => {
        target.forEach((item) => {
            i++;
            if (i < depth - 1) {
                item.decoratorAssets = builder();
                recursor(item.decoratorAssets);
            } else {
                if (helmet) {
                    item.decoratorAssets = helmet();
                }
            }
        });
    };

    recursor(base);

    return base;
}
