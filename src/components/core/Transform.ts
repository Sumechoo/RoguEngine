import { Vec3 } from "cannon";
import { IObservable, UpdateListener } from "./interfaces";

export class Transform implements IObservable<Transform> {
    public position: Vec3;
    public rotation: Vec3;

    public externalModified = false;

    private listeners: Array<UpdateListener<Transform>> = [];

    constructor() {
        this.position = Vec3.ZERO.clone();
        this.rotation = Vec3.ZERO.clone();
    }

    public setPosition(newPosition: Vec3, external = true) {
        this.setAsExternalValidated(external);
        this.position = newPosition;

        this.notify();
    }

    public setRotation(newRotation: Vec3, external = true) {
        this.setAsExternalValidated(external);
        this.rotation = newRotation;

        this.notify();
    }

    private setAsExternalValidated(external: boolean) {
        this.externalModified = external;
    }

    subscribe(listener: UpdateListener<Transform>) {
        this.listeners.push(listener);
    }

    unsubscribe(listener: UpdateListener<Transform>) {
        const index = this.listeners.indexOf(listener);

        this.listeners.splice(index, 1);
    }

    notify() {
        const newValues = {...this};
        this.listeners.forEach((listener) => listener(newValues));
    }
}