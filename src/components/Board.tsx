import React, { FC, useEffect } from "react";

import hash2DPositionTo1d from "../lib/hash2DPositionTo1d";
import Tile from "./Tile";
import { motion, useAnimate } from "framer-motion";

interface BoardProps {
    board: BoardType;
    disabled: Boolean;
}

const Board: FC<BoardProps> = ({ board, disabled = false }) => {
    // use useanimate to shake the board when it's cleared to zero
    const [scope, animate] = useAnimate();
    useEffect(() => {
        if (board?.player1?.length || board?.player2?.length) return;
        const animation = async () => {
            await animate(scope.current, { scale: 2 }, { duration: 0.3 });
            await animate(scope.current, { scale: 1 }, { duration: 0.3 });
        };
        animation();
    }, [board?.player1?.length, board?.player2?.length]);

    return (
        <div ref={scope} className={"board" + (disabled ? " disabled" : "")}>
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
        </div>
    );
};

export default Board;
