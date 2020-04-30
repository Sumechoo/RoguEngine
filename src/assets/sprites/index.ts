import block from './block.png';
import pen from './pen.png';
import water from './water.png';
import wall from './wall.png';
import bush from './bush.png';
import error from './error.png';
import tree from './tree.png';
import hand from './hand.png';
import bricks from './bricks.png';
import window from './window.png';
import antena from './antena.png';
import grass from './grass.png';
import door from './door.png';
import web from './web.png';
import wood from './wood.png';
import beton from './beton.png';
import garbage from './garbage.png';
import trashCan from './trashCan.png';
import tree_big from './tree_big.png';

import { makeMaterial } from './utils';

export const ASSETS = {
    block: makeMaterial(block),
    pen: makeMaterial(pen, true),
    water: makeMaterial(water),
    wall: makeMaterial(wall),
    bricks: makeMaterial(bricks),
    grass: makeMaterial(grass),
    window: makeMaterial(window),
    bush: makeMaterial(bush, true),
    tree: makeMaterial(tree, true),
    tree_big: makeMaterial(tree_big, true),
    hand: makeMaterial(hand, true),
    web: makeMaterial(web, true),
    garbage: makeMaterial(garbage, true),
    wood: makeMaterial(wood),
    trashCan: makeMaterial(trashCan),
    beton: makeMaterial(beton),
    antena: makeMaterial(antena, true),
    door: makeMaterial(door),
    
    error: makeMaterial(error),
}