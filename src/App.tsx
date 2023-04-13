/*
  
  I'm going to use a global object to store the position state of the players, with playerName as key.
  Storing each player's state seperately abstracts away the complexity of 3 states as options:
         ex. [no-one, p1, p2] as possible states
  
  Additionally, that lets us store things a little 'backwards' for faster lookups.
  
  Instead of storing the entire table state as values, we can use the position as a key in a hash table.

  I'll use a reducer to mutate the global object state of the players positions, and helpers:
   - check if there's a winner.
   - to check if there's a stalemate.
   - to check if the game is over.

  Before UI rendering, I'll calculate all the winning states and store them as an array.

  To figure out if the each player is in a winning state, I'll check if the player's positions
  are present in the winning state array (by iterating through the winning array).

*/

import "./styles.css";

import { useReducer, createContext, useContext, useState } from "react";

// Components
import Board from "./components/Board";
import Button from "./components/Button";

// Library
import generateWinningStates from "./lib/generateWinningStates";
import whosTheWinner from "./lib/whosTheWinner";
import checkForStalemate from "./lib/checkForStalemate";

const winningStates = generateWinningStates();
const emptyBoardState = {
    player1: [],
    player2: [],
};

// Contexts and their types
type BoardContextType = Players | Function;
type MutateBoardContextType = React.Dispatch<DispatchAction> | Function;
export const BoardContext = createContext<BoardContextType>(() => {});
export const MutateBoardContext = createContext<MutateBoardContextType>(() => {});
export const WhoseTurnContext = createContext<string>("player1");

import hash2DPositionTo1d from "./lib/hash2DPositionTo1d";

const deepCopy = (obj: any): any => JSON.parse(JSON.stringify(obj));

const reducerForPlayerPositions = (switchPlayer: Function) => {
    return (state: Players, action: DispatchAction) => {
        switch (action.actionType) {
            case "add":
                switchPlayer();
                const newState = { ...state };
                newState[action.player][hash2DPositionTo1d(action.position)] = true;
                return newState;
            case "clear":
                return deepCopy(emptyBoardState);
        }
    };
};

export default function App() {
    const [whoseTurn, switchPlayer] = useReducer(
        (state: string) => (state === "player1" ? "player2" : "player1"),
        "player1"
    );
    const [playerPositions, mutatePositions] = useReducer(
        reducerForPlayerPositions(switchPlayer),
        deepCopy(emptyBoardState)
    );

    const winner = whosTheWinner({
        playerPositions,
        winningStates,
    });
    const isStalemate = checkForStalemate(playerPositions);
    const isGameOver = winner || isStalemate;
    const disabled = !!isGameOver;

    // Export playerPositions, disabled, and mutatePositions as contexts
    // to be used by the board and tile components:

    return (
        <div className="App">
            <h1>Connect 4</h1>
            <BoardContext.Provider value={playerPositions}>
                <MutateBoardContext.Provider value={mutatePositions}>
                    <WhoseTurnContext.Provider value={whoseTurn}>
                        <Board playerPositions={playerPositions} disabled={disabled} />
                        {isGameOver && (
                            <div className="game-over">
                                {winner && <h2>{winner} won!</h2>}
                                <Button
                                    label="Restart game"
                                    onClick={() => {
                                        mutatePositions({
                                            actionType: "clear",
                                            player: "",
                                            position: { row: 0, column: 0 },
                                        });
                                    }}
                                />
                            </div>
                        )}
                        <StateDisplay />
                    </WhoseTurnContext.Provider>
                </MutateBoardContext.Provider>
            </BoardContext.Provider>
        </div>
    );
}

const StateDisplay = () => {
    const Board = useContext(BoardContext);
    const whoseTurn = useContext(WhoseTurnContext);
    return (
        <div className="StateDisplay" style={{ width: "100%" }}>
            <h2>
                It's
                {Object.keys(Board).map((p) => (
                    <span className={"player " + (p == whoseTurn ? p : "")}>{p}'s</span>
                ))}
                turn now!
            </h2>

            {/* <h2>Current State</h2>
            {JSON.stringify(Board, null, 2)} */}
        </div>
    );
};
