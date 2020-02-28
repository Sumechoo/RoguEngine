import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";
import { VisualEditor } from "../../ui/components/VisualEditor";

export class GizmosEditor extends Level {
  private targetCube: Cube = new Cube(new Vec3(1, 2, 0), 2, false, 0x126490);

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

    this.add(new Cube(new Vec3(0, -6, 0), 10, true, 0xaf2449));
  }
}
