import React, { FC, useContext } from "react";

import { MutateBoardContext, BoardContext, WhoseTurnContext } from "../App";

const Tile: FC<Position> = ({ row, column }) => {
    const MutateBoard = useContext(MutateBoardContext);
    const Board = useContext(BoardContext);
    const whoseTurn = useContext(WhoseTurnContext);
    console.log({ whoseTurn });

    return (
        <span
            className={"tile " + row}
            onClick={() => {
                MutateBoard({
                    actionType: "add",
                    player: whoseTurn,
                    position: { row, column },
                });
            }}
        >
            <span className="tile-inner">
                ({row},{column})
            </span>
        </span>
    );
};

export default Tile;
