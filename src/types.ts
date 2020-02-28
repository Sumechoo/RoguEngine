import { MeshPhysicalMaterial, Mesh } from "three";
import React, { CSSProperties } from 'react';
import { GameObject } from "./components/core";
import { Level } from "./components/Level";

export interface IGameState {
  items: Array<string>;
  activeItem: number;

  // developer params
  showDeveloperMenu: boolean;
  currentLevel?: Level;
}

export type GameInputEvent = MouseEvent | KeyboardEvent;

export interface IForce {
  x: number;
  y: number;
  z: number;

  ry: number;
  rx: number;
}

export interface Updateable {
  update: (frameNum: number) => void;
}

export interface Initable {
  init: () => void;
}

export interface WithMaterial {
  material?: MeshPhysicalMaterial;
}

export type Object3dWithMaterial = GameObject & WithMaterial;
export type MeshWithMaterial = Mesh & WithMaterial;

export type Styles = {[key: string]: CSSProperties};

export interface UIScope<T> {
  Component: React.FC<T>;
  props: T;
}
