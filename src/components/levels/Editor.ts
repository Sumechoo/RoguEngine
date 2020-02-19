import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";
import { TextureEditor } from "../../ui/components/TextureEditor";
import { Texture } from "three";

export class Editor extends Level {
  private targetCube: Cube = new Cube(new Vec3(0, 0, 0), 2, false, 0x126490);

  constructor() {
    super();

    this.ui = {
      Component: TextureEditor,
      props: {
        setCubeTexture: this.setCubeTexture,
      }
    };
  }

  setCubeTexture = (texture: Texture) => {
    const {body} = this.targetCube;

    if(body && body.material) {
      body.material.map = texture;
    }

    texture.needsUpdate = true;
  }

  init() {
    this.add(this.targetCube);

    this.add(new Cube(new Vec3(0, -6, 0), 10, true, 0xaf2449));
  }
}
