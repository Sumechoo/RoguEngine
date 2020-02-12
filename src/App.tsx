import React, { useEffect, useRef } from "react";
import { PerspectiveCamera } from "three";
import { PlayerController } from "./components/PlayerController";
import { Updateable } from "./types";
import { Renderer } from "./components/singletons/Renderer";
import { Demo } from "./components/levels/Demo";

const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new Renderer();
const controller = new PlayerController(camera, document.body);

const demoLevel = new Demo();

renderer.setActiveCamera(camera);
renderer.setupLevel(demoLevel);

camera.position.z = 5;

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
    if (displayRef.current !== undefined) {
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
