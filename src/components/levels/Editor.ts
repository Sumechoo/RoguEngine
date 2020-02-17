import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";
import { TextureEditor } from "../../ui/components/TextureEditor";
import { Color, Texture, CanvasTexture } from "three";

export class Editor extends Level {
  private targetCube: Cube = new Cube(new Vec3(1, 1, 0), 1, false, 0x126490);

  constructor() {
    super();

    this.ui = {
      Component: TextureEditor,
      props: {
        setCubeTexture: this.setCubeTexture,
      }
    };
  }

  setCubeTexture = (ctx: CanvasRenderingContext2D) => {
    const {body} = this.targetCube;
    const texture = new CanvasTexture(ctx.canvas);

    if(body && body.material) {
      body.material.map = texture;
      body.material.bumpMap = texture;
    }
  }

  init() {
    this.add(this.targetCube);

    this.add(new Cube(new Vec3(0, -6, 0), 10, true, 0xaf2449));
  }
}
