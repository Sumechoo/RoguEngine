import { MeshPhysicalMaterial, TextureLoader, NearestFilter, DoubleSide } from "three";

export function makeMaterial(t: string, transparent = false) {
    const texture = new TextureLoader().load(t);
    texture.magFilter = NearestFilter;

    return new MeshPhysicalMaterial({ 
        map: texture,
        roughnessMap: texture,
        side: transparent ? DoubleSide : undefined,
        transparent,
    });
}