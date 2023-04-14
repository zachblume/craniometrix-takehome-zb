import { useContext } from "react";
import Button from "./Button";
import { MutateBoardContext } from "../App";
const GameOver = ({ winner }: { winner: string | null | boolean }) => {
    const mutatePositions = useContext(MutateBoardContext);

    return (
        <div className="game-over">
            {winner && <h2 className={winner.toString()}>{winner} won!</h2>}
            <Button
                label="Restart game!"
                onClick={() => {
                    mutatePositions("clear");
                }}
            />
        </div>
    );
};
export default GameOver;
