import React, { useEffect, useRef, useCallback } from "react";
import { PerspectiveCamera } from "three";
import { PlayerController } from "./components/PlayerController";
import { Updateable } from "./types";
import { Renderer } from "./components/singletons/Renderer";
import { Demo } from "./components/levels/Demo";
import { Box, Vec3 } from "cannon";
import { Cube } from "./components/gameobjects/primitives/Cube";
import { Level } from "./components/Level";
import { Demo2 } from "./components/levels/Demo2";

const camera = new PerspectiveCamera(75, 320 / 240, 0.1, 1000);
const playerBody = new Cube(new Vec3(0, 0, 3), 1, false, 0xff0000);

playerBody.add(camera);

const renderer = new Renderer();
const controller = new PlayerController(playerBody, document.body);

const demoLevel = new Demo();

demoLevel.add(playerBody);

renderer.setActiveCamera(camera);
renderer.setupLevel(demoLevel);

const updateables: ReadonlyArray<Updateable> = [
  demoLevel,
  controller,
  renderer
];

function switchLevel(level: Level) {
  level.add(playerBody);
  renderer.setupLevel(level);
}

function animate(frameNum: number) {
  requestAnimationFrame(animate);
  updateables.forEach(item => item.update(frameNum));
}
animate(0);

export default function App() {
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (displayRef.current !== null) {
      displayRef.current.appendChild(renderer.getDOMElement());
    }
  }, [displayRef]);

  const lockPointer = useCallback(() => {
    if(displayRef.current) {
      (displayRef.current as any).requestPointerLock();
    }
  }, [displayRef]);

  const loadLevel = useCallback(() => {
    switchLevel(new Demo2());
  }, []);

  return (
    <>
      <div onClick={lockPointer} className="App" ref={displayRef} />
      <p>Movement: WASD</p>
      <button onClick={loadLevel}>Transit to Demo2 level</button>
    </>
  );
}
