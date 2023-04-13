import React, { FC } from "react";

import hash2DPositionTo1d from "../lib/hash2DPositionTo1d";
import Tile from "./Tile";

interface BoardProps {
    playerPositions: Players;
    disabled: Boolean;
}

const Board: FC<BoardProps> = ({ playerPositions }) => (
    <div className="board">
        {Array(7)
            .fill(null)
            .map((_, row) => (
                <div className="row" key={row}>
                    {Array(6)
                        .fill(null)
                        .map((i, column) => (
                            <span className="column" key={column}>
                                <Tile {...{ row, column }} />
                            </span>
                        ))}
                </div>
            ))}
    </div>
);

export default Board;
