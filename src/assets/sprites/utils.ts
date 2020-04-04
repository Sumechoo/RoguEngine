import { MeshPhysicalMaterial, TextureLoader, NearestFilter } from "three";

export function makeMaterial(t: string) {
    const texture = new TextureLoader().load(t);
    texture.magFilter = NearestFilter;

    return new MeshPhysicalMaterial({ map: texture, roughnessMap: texture, bumpMap: texture, transparent: true });
}