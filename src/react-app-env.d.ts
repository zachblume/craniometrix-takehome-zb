/// <reference types="react-scripts" />
// Players is an object with string keys and Positions value type
type Players = {
    [key: string]: Positions;
};
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
