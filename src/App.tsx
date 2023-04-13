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

import { useReducer } from "react";

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

const reducerForPlayerPositions = (state: Players, action: DispatchAction) => {
    switch (action.actionType) {
        case "add":
            return {
                ...state,
                [action.player]: [...state[action.player], action.position],
            };
        case "clear":
            return emptyBoardState;
        default:
            return emptyBoardState;
    }
};

export default function App() {
    const [playerPositions, mutatePositions] = useReducer(reducerForPlayerPositions, {
        player1: [],
        player2: [],
    });

    const winner = whosTheWinner({ playerPositions, winningStates });
    const isStalemate = checkForStalemate(playerPositions);
    const isGameOver = winner || isStalemate;

    return (
        <div className="App">
            <h1>Connect 4</h1>
            <Board playerPositions={playerPositions} disabled={!!isGameOver} />
            {isGameOver && (
                <div className="game-over">
                    <Button label="Restart game" onClick={() => {}} />
                </div>
            )}
        </div>
    );
}
