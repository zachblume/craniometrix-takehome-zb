import React, { FC } from "react";

interface BoardProps {
    playerPositions: Players;
    disabled: Boolean;
}

const Board: FC<BoardProps> = ({ playerPositions }) => {
    return <>Board</>;
};

export default Board;
