import React, { useEffect, useRef, useCallback, useState } from "react";
import { Updateable, UIScope } from "./types";
import { Renderer } from "./components/singletons/Renderer";
import { Level } from "./components/Level";
import { MainDisplay } from "./ui/MainDisplay";
import { Player } from "./components/gameobjects/Player";

const renderer = new Renderer();

const updateables: ReadonlyArray<Updateable> = [
  renderer
];

function switchLevel(level: Level) {
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
