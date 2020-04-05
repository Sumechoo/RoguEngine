import block from './block.png';
import pen from './pen.png';
import water from './water.png';
import wall from './wall.png';
import bush from './bush.png';
import error from './error.png';
import tree from './tree.png';
import hand from './hand.png';

import { makeMaterial } from './utils';

export const ASSETS = {
    block: makeMaterial(block),
    pen: makeMaterial(pen, true),
    water: makeMaterial(water),
    wall: makeMaterial(wall),
    bush: makeMaterial(bush, true),
    tree: makeMaterial(tree, true),
    hand: makeMaterial(hand, true),
    error: makeMaterial(error),
}