import { MeshPhysicalMaterial, Mesh } from "three";
import React, { CSSProperties } from 'react';

export interface IGameState {}

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

export type Object3dWithMaterial = Mesh & WithMaterial;

export type Styles = {[key: string]: CSSProperties};

export interface UIScope {
  Component: React.FC<any>;
  props: any;
}
