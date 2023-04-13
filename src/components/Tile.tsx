import React, { FC, useContext } from "react";

import { MutateBoardContext, BoardContext, WhoseTurnContext } from "../App";
import hash2DPositionTo1d from "../lib/hash2DPositionTo1d";

const Tile: FC<Position> = ({ row, column }) => {
    const MutateBoard = useContext(MutateBoardContext);
    const Board = useContext(BoardContext);
    const whoseTurn = useContext(WhoseTurnContext);

    // Figure out who is in this tile
    var who: string | null = null;
    for (let [playerName, playerPositions] of Object.entries(Board)) {
        if (playerPositions[hash2DPositionTo1d({ row, column })] === true) {
            who = playerName;
        }
    }

    return (
        <span
            className={"tile " + who}
            onClick={() => {
                // If it's occupied, do nothing
                if (who) return;

                MutateBoard({
                    actionType: "add",
                    player: whoseTurn,
                    position: { row, column },
                });
            }}
        >
            <span className="tile-inner">{who || "d "}</span>
        </span>
    );
};

export default Tile;
