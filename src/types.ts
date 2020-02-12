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
