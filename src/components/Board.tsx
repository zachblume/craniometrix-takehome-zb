import React, { FC } from "react";

interface BoardProps {
    redPositions: Positions;
    yellowPositions: Positions;
}

const Board: FC<BoardProps> = ({ redPositions, yellowPositions }) => {
    return <>Board</>;
};

export default Board;
