import React, { FC } from "react";

import hash2DPositionTo1d from "../lib/hash2DPositionTo1d";
import Tile from "./Tile";
import { motion } from "framer-motion";

interface BoardProps {
    playerPositions: Players;
    disabled: Boolean;
}

const Board: FC<BoardProps> = ({ playerPositions, disabled = false }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 4,
            delay: 0,
            ease: [0, 0.71, 0.2, 1.01],
        }}
        className={"board" + (disabled ? " disabled" : "")}
    >
        {Array(6)
            .fill(null)
            .map((_, row) => (
                <div className="row" key={row}>
                    {Array(7)
                        .fill(null)
                        .map((i, column) => (
                            <span className="column" key={column}>
                                <Tile {...{ row, column }} {...{ disabled }} />
                            </span>
                        ))}
                </div>
            ))}
    </motion.div>
);

export default Board;
