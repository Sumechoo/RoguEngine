import React, { useEffect, useRef, useCallback, useState } from "react";
import { PerspectiveCamera } from "three";
import { PlayerController } from "./components/PlayerController";
import { Updateable, UIScope } from "./types";
import { Renderer } from "./components/singletons/Renderer";
import { Vec3 } from "cannon";
import { Cube } from "./components/gameobjects/primitives/Cube";
import { Level } from "./components/Level";
import { MainDisplay } from "./ui/MainDisplay";

const camera = new PerspectiveCamera(75, 320 / 240, 0.1, 1000);
const playerBody = new Cube(new Vec3(0, 0, 3), 1, false, 0xff0000);

playerBody.add(camera);

const renderer = new Renderer();
const controller = new PlayerController(playerBody, camera, document.body);

renderer.setActiveCamera(camera);

const updateables: ReadonlyArray<Updateable> = [
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
  const [Ui, setUi] = useState<UIScope | undefined>();

  useEffect(() => {
    if (displayRef.current !== null) {
      displayRef.current.appendChild(renderer.getDOMElement());
    }
  }, [displayRef]);

  const loadLevel = useCallback((levelConstructor: typeof Level) => {
    const level = new levelConstructor();
    setUi(level.ui)

    switchLevel(level);

    document.addEventListener('click', lockPointer);
  }, []);

  const lockPointer = () => {
    if(displayRef.current) {
      (displayRef.current as any).requestPointerLock();
    }
  }

  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0}} ref={displayRef}>
        <MainDisplay onSwitchLevel={loadLevel} />
        <div style={{position: 'absolute', top: 0, left: 0}}>
          {Ui && <Ui.Component 
            {...Ui.props}
          />}
        </div>
      </div>
    </>
  );
}
