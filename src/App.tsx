/*
  OK so I have an approach.

  I'm going to use a global state to store the positions of the players;
   instead of labeling players I'll let that be arbitrary.

  I'll use a reducer to mutate the global object state of the players positions,
  and little helper operations:
   - check if there's a winner.
   - to check if there's a stalemate.
   - to check if the game is over.

  In the meantime that the initial UI is rendering, I'll calculate all the winning states
  asynchronously and store them as a hash table.

  To figure out if the each player is in a winning state, I'll check if the player's positions
  are present in the winning state hash table.

  I'm not exactly sure off the top of my head the approach for optimal time complexity in
  running the state comparison of a position[] against the hash table.

  Offhandedly, I remember someone using bit math for this type of hash comparison
  by encoding enach binary TilePlaced or !TilePlaced as a 1 or 0 respectively
  in a N bit number (42 in this case), and then running the comparison
  using logical conjunction against each of the winning states
  to see if the player's positions are present in the winning state hash table.

  Obviously logical AND is a O(1) operation, I kind of just remember that, so I need to take
  a minute to think about if there is a algorithmically efficient way of approaching that
  that doesn't involve bit match haha.

  OK so once I've done that, I'll do a pass to make sure my typescript is up to snuff
  (obviously it will have to compile while I'm writing as well).

  That's my plan.

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
