import { TopConfig } from "./types";
import { MenuItem } from "../../Contextual/types";
import { Level } from "../../../../components/Level";
import { GizmosEditor, Editor, Columns, Demo, Dungeon, GameStateEditor, DickBench } from "../../../../components/levels";
import { API } from "../../../../components/singletons/API";

function getLevelsMenu() : MenuItem[] {
    const levelsList: Array<typeof Level> = [GizmosEditor, Editor, Columns, Demo, Dungeon, GameStateEditor, DickBench];

    return levelsList.map((levelItem) => ({
        title: levelItem.entityName,
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