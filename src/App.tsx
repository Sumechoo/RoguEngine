import React, { useEffect, useRef, useCallback, useState } from "react";
import { UIScope } from "./types";
import { Renderer } from "./components/singletons/Renderer";
import { Level } from "./components/Level";
import { MainDisplay } from "./ui/MainDisplay";
import { GameState } from "./components/singletons/GameState";
import { SingletoneStore } from "./components/singletons/SingletoneStore";

const renderer = new Renderer();
new GameState();
new SingletoneStore();

function switchLevel(level: Level) {
  renderer.setupLevel(level);
}

function animate(frameNum: number) {
  requestAnimationFrame(animate);
  renderer.update(frameNum);
}
animate(0);

export default function App() {
  const displayRef = useRef<HTMLDivElement>(null);
  const [Ui, setUi] = useState<UIScope<any> | undefined>();

  useEffect(() => {
    if (displayRef.current !== null) {
      displayRef.current.appendChild(renderer.getDOMElement());
    }
  }, [displayRef]);

  const loadLevel = useCallback((levelConstructor: typeof Level) => {
    const level = new levelConstructor();
    setUi(level.ui)

    switchLevel(level);
  }, []);

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
