/*
  Here's my approach.

  I'm going to use a global object to store the position state of the players, with playerName as key.
  Storing each player's state seperately abstracts away the complexity of 3 states as options:
         ex. [no-one, p1, p2] as possible states
  
  Additionally, that lets us store things a little 'backwards' for faster lookups.
  
  Instead of storing the entire table state as values, we can use the position as a key in a hash table.

  I'll use a reducer to mutate the global object state of the players positions, and helpers:
   - check if there's a winner.
   - to check if there's a stalemate.
   - to check if the game is over.

  In the meantime that the initial UI is rendering, I'll calculate all the winning states
  asynchronously and store them as an array.

  To figure out if the each player is in a winning state, I'll check if the player's positions
  are present in the winning state array (by iterating through the winning array).
*/

import "./styles.css";
import Board from "./components/Board";
import Button from "./components/Button";
import Tile from "./components/Tile";

import { useMemo, useReducer } from "react";

const winningStates = [];

const generateWinningStates = () => {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const horizontal = [],
                vertical = [],
                diagonal = [],
                diagonal2 = [];
            for (let k = 0; k < 4; k++) {
                horizontal.push({ row: i, column: j + k });
                vertical.push({ row: i + k, column: j });
                diagonal.push({ row: i + k, column: j + k });
                diagonal2.push({ row: i + k, column: j - k });
            }
            winningStates.push(horizontal, vertical, diagonal, diagonal2);
        }
    }
};

const isWinner = (positions: Position[]) => {
    let columnVerticalSum = [];
    let rowHorizontalSum = [];
    let diagonalSums = [];

    for (let position of positions) {
    }

    return false;
};

const whosTheWinner = () => {
    for (let player of playersPositions) {
        if (isWinner(player)) return player;
    }
    return false;
};

const isStalemate = (playerPositions) => {
    return playerPositions.reduce((accumulator, player) => accumulator + player.length) === 42;
};

export default function App() {
    const [playerPositions, mutatePositions] = useReducer<Players>([]);
    const winner = whosTheWinner(playerPositions);
    const stalemate = isStalemate(playerPositions);

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
