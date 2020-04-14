import { TopConfig } from "./types";
import { MenuItem } from "../../Contextual/types";
import { Level } from "../../../../components/Level";
import { GizmosEditor, Editor, Columns, Dungeon, GameStateEditor, DickBench } from "../../../../components/levels";
import { API } from "../../../../components/singletons/API";
import { GameState } from "../../../../components/singletons/GameState";
import { city } from "../../../../components/levels/Dungeon/locations/city";
import { city2 } from "../../../../components/levels/Dungeon/locations/city2";

function getLevelsMenu() : MenuItem[] {
    const levelsList: Array<typeof Level> = [GizmosEditor, Editor, Columns, Dungeon, GameStateEditor, DickBench];

    return levelsList.map((levelItem) => ({
        title: levelItem.entityName,
        action: () => API.getInstance().loadLevel(levelItem),
    }));
}

export const config: TopConfig = {
    configItems: [
        // {
        //     title: 'Levels',
        //     menuItems: getLevelsMenu(),
        // },
        {
            title: 'Locations',
            menuItems: [
                {
                    title: 'City demo',
                    action: () => {
                        GameState.setState({location: city});
                        API.getInstance().loadLevel(Dungeon);
                    }
                },
                {
                    title: 'City 2 demo',
                    action: () => {
                        GameState.setState({location: city2});
                        API.getInstance().loadLevel(Dungeon);
                    }
                },
            ],
        },
    ],
}