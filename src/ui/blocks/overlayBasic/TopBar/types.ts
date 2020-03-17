import { MenuItem } from "../../Contextual/types";

export interface BarConfig {
    title: string;
    menuItems: Array<MenuItem>;
}

export interface TopConfig {
    configItems: ReadonlyArray<BarConfig>;
}