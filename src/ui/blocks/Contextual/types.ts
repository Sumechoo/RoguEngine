export interface MenuItem {
    title: string;
    action: () => void;
}

export interface MenuConfig {
    id: string;
    items: ReadonlyArray<MenuItem>;
}