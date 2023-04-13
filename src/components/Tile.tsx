import React, { FC, useContext } from "react";

import { MutateBoardContext, BoardContext } from "../App";

const Tile: FC<Position> = ({ row, column }) => {
    const MutateBoard = useContext(MutateBoardContext);
    const Board = useContext(BoardContext);

    return (
        <span
            className={"tile " + row}
            onClick={() => {
                MutateBoard({
                    actionType: "add",
                    player: "player1",
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
