import React, { useEffect, useRef } from "react";
import { PerspectiveCamera } from "three";
import { PlayerController } from "./components/PlayerController";
import { Updateable } from "./types";
import { Renderer } from "./components/singletons/Renderer";
import { Demo } from "./components/levels/Demo";
import { Box, Vec3 } from "cannon";
import { Cube } from "./components/gameobjects/primitives/Cube";

const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
const playerBody = new Cube(new Vec3(0, 0, 2), 0.5, false, 0xff0000);

playerBody.add(camera);

const renderer = new Renderer();
const controller = new PlayerController(playerBody, document.body);

const demoLevel = new Demo();

demoLevel.add(playerBody);

renderer.setActiveCamera(camera);
renderer.setupLevel(demoLevel);

// camera.position.z = 4;

const updateables: ReadonlyArray<Updateable> = [
  demoLevel,
  controller,
  renderer
];

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

  return (
    <>
      <div className="App" ref={displayRef} />
      <p>Movement: WASD</p>
      <p>Look Up/Down: Q/E</p>
    </>
  );
}
