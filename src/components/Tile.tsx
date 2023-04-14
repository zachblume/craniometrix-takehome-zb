import { FC, useContext, useEffect } from "react";
import { MutateBoardContext, BoardContext, WhoseTurnContext } from "../App";
import { useAnimate } from "framer-motion";
import hash2DPositionTo1d from "../lib/hash2DPositionTo1d";
import unHashPosition from "../lib/unHashPosition";

type TileProps = {
    disabled: Boolean;
} & Position;

const Tile: FC<TileProps> = ({ row, column, disabled = false }) => {
    const MutateBoard = useContext(MutateBoardContext);
    const Board = useContext(BoardContext);
    const whoseTurn = useContext(WhoseTurnContext);

    // Who has already placed this tile?
    var who: string | null = null;
    for (let [playerName, thisPlayersPositions] of Object.entries(Board)) {
        if (thisPlayersPositions[hash2DPositionTo1d({ row, column })] === true) who = playerName;
    }

    // Loop through each player and each of their positions, and see if any of them are in this column
    // This logic needs to be here, NOT in the action dispatcher, because idempotency in react strict mode
    // depends on the reducer being pure.
    let rowsInThisColumn = 0;
    for (let [playerName, thisPlayersPositions] of Object.entries(Board)) {
        for (let positionHash of Object.keys(thisPlayersPositions)) {
            if (unHashPosition(positionHash).column === column) rowsInThisColumn++;
        }
    }
    const columnIsFull = rowsInThisColumn === 6;
    const nextRowToFill = 5 - rowsInThisColumn;

    // Animate the dropping tile
    const [tileRef, animate] = useAnimate();
    useEffect(() => {
        if (!who) return;
        const animation = async () => {
            await animate(tileRef.current, { y: "-500%" }, { duration: 0.0001 });
            await animate(tileRef.current, { y: "0%" }, { duration: 0.5 });
        };
        animation();
    }, [who]);

    return (
        <span
            ref={tileRef}
            className={"tile " + who}
            onClick={() => {
                if (disabled) return;
                if (columnIsFull) return;
                MutateBoard({
                    actionType: "add",
                    player: whoseTurn,
                    position: { row: nextRowToFill, column },
                });
            }}
        />
    );
};

export default Tile;
