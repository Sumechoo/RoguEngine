type InputMap<K extends keyof HTMLElementEventMap> = Record<K, (e: HTMLElementEventMap[K]) => void>;

export class InputHandler<K extends keyof HTMLElementEventMap> {
    protected static instance: InputHandler<any>;

    private inputMap: InputMap<K>;
    private el: HTMLElement;

    constructor(el: HTMLElement, inputMap: InputMap<K>) {
        this.inputMap = inputMap;
        this.el = el;

        (Object.keys(inputMap) as Array<K>).forEach((eventType) => {
            el.addEventListener(eventType, inputMap[eventType]);
        });
    }

    public cleanup = () => {
        (Object.keys(this.inputMap) as Array<K>).forEach((eventType) => {
            this.el.removeEventListener(eventType, this.inputMap[eventType]);
        });
    }
}