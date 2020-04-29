import React, { useEffect, useRef, useCallback, useState } from "react";
import { UIScope, Styles } from "./types";
import { Renderer } from "./components/singletons/Renderer";
import { Level } from "./components/Level";
import { MainDisplay } from "./ui/MainDisplay";
import { GameState } from "./components/singletons/GameState";
import { SingletoneStore } from "./components/singletons/SingletoneStore";
import { Overlay } from "./ui/components/Overlay";
import { API } from "./components/singletons/API";
import { Dungeon } from "./components/levels";
import { techDemos } from "./components/levels/Dungeon/locations/techDemos";
import { suburb } from "./components/levels/Dungeon/locations/suburb";

const styles: Styles = {
  main: {
    fontFamily: 'Open Sans',
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    bottom: 0,
    overflow: 'hidden',
    background: 'rgba(255,255,255,0.6)',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    bottom: 0,
  },
  displayContainer: {
    position: 'relative',
  }
};

new GameState();
const renderer = new Renderer();
new SingletoneStore();
new API();

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
  const {prod} = GameState.getState();

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
  }, [setUi]);

  useEffect(() => {
    const api = API.getInstance();
    api.loadLevel = loadLevel;

    if (prod) {
      GameState.setState({location: suburb});
      api.loadLevel(Dungeon);
      
      document.addEventListener('click', () => {
        if (!GameState.getState().inventoryCandidate) {
          (document.body as any).requestPointerLock();
        }
      });
    }

    return () => {api.loadLevel = () => {}};
  }, [loadLevel])

  return (
    <div style={styles.backdrop} >
      <div style={styles.main} >
        <Overlay
          prod={prod}
          bottom={<span>HELPER</span>}
          right={Ui && <Ui.Component {...Ui.props} />}
          renderer={<div style={styles.displayContainer} ref={displayRef}>
            <MainDisplay />
          </div>}
        />
      </div>
    </div>
  );
}
