import React, { FC, useContext } from "react";

import { MutateBoardContext, BoardContext, WhoseTurnContext } from "../App";
import hash2DPositionTo1d from "../lib/hash2DPositionTo1d";
import unHashPosition from "../lib/unHashPosition";
import { motion } from "framer-motion";

const Tile = ({
    row,
    column,
    disabled = false,
}: {
    row: number;
    column: number;
    disabled: Boolean;
}) => {
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

    // calculations for click handling
    const combinedPositions = Object.values(Board).reduce(
        (acc, playerPositions) => ({ ...acc, ...playerPositions }),
        {}
    );
    console.log(Object.keys(combinedPositions));
    // lowest filled row in this column
    const rowsInThisColumn = Object.keys(combinedPositions)
        .map(unHashPosition)
        .filter((position: Position) => position.column === column)
        .map((position: Position) => position.row)
        .sort((a: number, b: number) => b - a);
    const columnIsFull = rowsInThisColumn.length === 6;
    const nextRowToFill = 5 - rowsInThisColumn?.length;

    return (
        <motion.span
            className={"tile " + who}
            onClick={() => {
                if (disabled) return;

                // If every row in this column is occupied, do nothing
                if (columnIsFull) return;

                MutateBoard({
                    actionType: "add",
                    player: whoseTurn,
                    position: { row: nextRowToFill, column },
                });
            }}
        >
            <span className="tile-inner"></span>
        </motion.span>
    );
};

export default Tile;
