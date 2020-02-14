import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";
import { TextureEditor } from "../../ui/components/TextureEditor";
import { Color, Texture } from "three";

export class Editor extends Level {
  private targetCube: Cube = new Cube(new Vec3(1, 1, 0), 1, false, 0x126490);

  constructor() {
    super();

    this.ui = {
      Component: TextureEditor,
      props: {
        setCubeColor: this.setCubeColor,
        setCubeTexture: this.setCubeTexture,
      }
    };
  }

  setCubeColor = (color: number) => {
    const {body} = this.targetCube;

    if(body && body.material) {
      body.material.color = new Color(color);
    }
  }

  setCubeTexture = (tex: Texture) => {
    const {body} = this.targetCube;

    if(body && body.material) {
      body.material.map = tex;
    }

    console.info('texture set', );
  }

  init() {
    this.add(this.targetCube);

    this.add(new Cube(new Vec3(0, -6, 0), 10, true, 0xaf2449));
  }
}
