import { TopConfig } from "./types";
import { MenuItem } from "../../Contextual/types";
import { Level } from "../../../../components/Level";
import { GizmosEditor, Sandbox, Editor, Columns, Demo, Demo2, Dungeon, GameStateEditor, DickBench } from "../../../../components/levels";
import { API } from "../../../../components/singletons/API";

function getLevelsMenu() : MenuItem[] {
    const levelsList: Array<typeof Level> = [GizmosEditor, Sandbox, Editor, Columns, Demo, Demo2, Dungeon, GameStateEditor, DickBench];

    return levelsList.map((levelItem) => ({
        title: levelItem.name,
        action: () => API.getInstance().loadLevel(levelItem),
    }));
}

export const config: TopConfig = {
    configItems: [
        {
            title: 'Levels',
            menuItems: getLevelsMenu(),
        },
        {
            title: 'Demo actions',
            menuItems: [],
        },
    ],
}