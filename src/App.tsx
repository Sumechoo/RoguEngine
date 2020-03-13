import React, { useEffect, useRef, useCallback, useState } from "react";
import { UIScope, Styles } from "./types";
import { Renderer } from "./components/singletons/Renderer";
import { Level } from "./components/Level";
import { MainDisplay } from "./ui/MainDisplay";
import { GameState } from "./components/singletons/GameState";
import { SingletoneStore } from "./components/singletons/SingletoneStore";
import { Overlay } from "./ui/components/Overlay";

const styles: Styles = {
  main: {
    fontFamily: 'Open Sans',
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    bottom: 0,
    overflow: 'hidden',
    background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)'
  }
};

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
    GameState.setState({currentLevel: level});
    setUi(level.ui)

    switchLevel(level);
  }, []);

  return (
    <div style={styles.main} >
      <MainDisplay onSwitchLevel={loadLevel} />
      <Overlay
        right={Ui && <Ui.Component {...Ui.props} />}
        renderer={<div ref={displayRef}/>}
      />
    </div>
  );
}
