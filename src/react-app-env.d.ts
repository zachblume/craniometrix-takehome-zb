/// <reference types="react-scripts" />

type Players = {
    [key: string]: HashOfPositions;
};
// HashOfPositions is an array of booleans
type HashOfPositions = Boolean[];

// positions is an array of Position type
type Positions = Position[];
type Position = {
    row: number;
    column: number;
};

// for reducer
type DispatchAction = {
    actionType: "add" | "clear";
    player: string;
    position: Position;
};
