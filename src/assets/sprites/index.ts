import block from './block.png';
import pen from './pen.png';
import water from './water.png';
import wall from './wall.png';
import bush from './bush.png';
import { makeMaterial } from './utils';

export const ASSETS = {
    block: makeMaterial(block),
    pen: makeMaterial(pen, true),
    water: makeMaterial(water),
    wall: makeMaterial(wall),
    bush: makeMaterial(bush, true),
}