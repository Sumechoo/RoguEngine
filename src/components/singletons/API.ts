import { Level } from "../Level";

export class API {
  protected static instance: API;

  public loadLevel: (levelConstructor: typeof Level) => void = () => {};

  constructor() {
    if (API.instance !== undefined) {
      throw new Error("Engine API instance allready exist");
    }

    API.instance = this;
  }

  public static getInstance() {
    return API.instance;
  }
}
