import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";
import { TextureEditor } from "../../ui/components/TextureEditor";
import { Texture } from "three";

export class Editor extends Level {
  public static entityName = 'Texture editor';

  private targetCube: Cube = new Cube({
    size: 2,
    kinematic: false,
  });

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

    this.add(new Cube({
      pos: new Vec3(0, -6, 0),
      size: 10,
      kinematic: true,
    }));
  }
}
