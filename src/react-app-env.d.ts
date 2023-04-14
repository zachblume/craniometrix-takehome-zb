/// <reference types="react-scripts" />

// Players is an object containing many players with their name as key and a HashOfPositions as value
type Players = {
    [key: string]: HashOfPositions;
};
// type Players = Record<string, HashOfPositions>;
// HashOfPositions is an array of booleans
type HashOfPositions = Boolean[];

// positions is an array of Position type
type Positions = Position[];
type Position = {
    row: number;
    column: number;
};

// for reducer
type DispatchAction =
    | {
          actionType: "add";
          player: string;
          position: Position;
      }
    | "clear";

type string = "player1" | "player2";
