import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";
import { VisualEditor } from "../../ui/components/VisualEditor";

export class GizmosEditor extends Level {
  public static entityName = 'Position editor demo';

  private targetCube: Cube = new Cube({
    pos: new Vec3(1, 2, 0),
    kinematic: true,
  });

  constructor() {
    super();

    this.ui = {
      Component: VisualEditor,
      props: {
        targetObject: this.targetCube.transform,
      } as keyof typeof VisualEditor.propTypes,
    };
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
