import "./styles.css";
import { useReducer, createContext, useContext, Fragment } from "react";

// Components
import Board from "./components/Board";
import Button from "./components/Button";

// Library
import generateWinningStates from "./lib/generateWinningStates";
import whosTheWinner from "./lib/whosTheWinner";
import checkForStalemate from "./lib/checkForStalemate";
import hash2DPositionTo1d from "./lib/hash2DPositionTo1d";

// Initialize
const winningStates = generateWinningStates();
const newEmptyBoardState = () => ({ player1: [], player2: [] });

// Instead of prop drilling, we're going to use context to pass down to the tile
type BoardContextType = BoardType | Function;
type MutateBoardContextType = React.Dispatch<DispatchAction> | Function;
type WhoseTurnContextType = string;
export const BoardContext = createContext<BoardContextType>(() => {});
export const MutateBoardContext = createContext<MutateBoardContextType>(() => {});
export const WhoseTurnContext = createContext<WhoseTurnContextType>("player1");

// !! This reducer is a function that returns a function !! We love Functional.
// This is so we can pass in the switchPlayer function to the reducer from inside the component.
// Since switchPlayer is itself a reducer, the lack of re-rendering the function is fine.
const returnBoardReducer =
    (switchPlayer: Function) => (state: BoardType, action: DispatchAction) => {
        switch (action) {
            case "clear":
                switchPlayer();
                return newEmptyBoardState();
            default: // Add:
                
                switchPlayer();
                state[action.player][hash2DPositionTo1d(action.position)] = true;
                return state;
        }
    };

// The main app component
export default function App() {
    const [whoseTurn, switchPlayer] = useReducer(
        (state: string) => (state === "player1" ? "player2" : "player1"),
        "player1"
    );
    const [board, mutatePositions] = useReducer(
        returnBoardReducer(switchPlayer),
        newEmptyBoardState()
    );
    const winner = whosTheWinner({
        board,
        winningStates,
    });
    const isStalemate = checkForStalemate(board);
    const isGameOver = winner || isStalemate;
    const disabled = !!isGameOver;

    return (
        <div className="App">
            <h1>Connect 4</h1>
            <BoardContext.Provider value={board}>
                <MutateBoardContext.Provider value={mutatePositions}>
                    <WhoseTurnContext.Provider value={whoseTurn}>
                        <Board board={board} disabled={disabled} />
                        {isGameOver ? <GameOver winner={winner} /> : <WhoseTurnDisplay />}
                    </WhoseTurnContext.Provider>
                </MutateBoardContext.Provider>
            </BoardContext.Provider>
        </div>
    );
}

const WhoseTurnDisplay = () => {
    const Board = useContext(BoardContext);
    const whoseTurn = useContext(WhoseTurnContext);
    return (
        <h2 className="WhoseTurnDisplay">
            It's
            {Object.keys(Board).map((p) => (
                <Fragment key={p}>
                    <span className={"player " + (p == whoseTurn ? p : "")}>{p}'s</span>{" "}
                </Fragment>
            ))}{" "}
            turn now!
        </h2>
    );
};

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
