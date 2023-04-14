import generateWinningStates from "../src/lib/generateWinningStates";
import hash2DPositionTo1d from "../src/lib/hash2DPositionTo1d";
import unHashPosition from "../src/lib/unHashPosition";
import isWinner from "../src/lib/isWinner";
import whosTheWinner from "../src/lib/whosTheWinner";
import checkForStalemate from "../src/lib/checkForStalemate";

describe("generateWinningStates()", () => {
    test("generates 168 winning states", () => {
        const winningStates = generateWinningStates();
        expect(winningStates.length).toBe(168);
    });

    test("states that are well-formed", () => {
        const winningStates = generateWinningStates();
        winningStates.forEach((state) => {
            expect(state.length).toBe(4);
            state.forEach((position) => {
                expect(position).toHaveProperty("column");
                expect(position).toHaveProperty("row");
            });
        });
    });
});

describe("hash2dPositionTo1d()", () => {
    test("basic test", () => {
        expect(hash2DPositionTo1d({ row: 0, column: 0 })).toBe(0);
        expect(hash2DPositionTo1d({ row: 0, column: 1 })).toBe(1);
        expect(hash2DPositionTo1d({ row: 4, column: 5 })).toBe(45);
    });
});

describe("unHashPosition()", () => {
    test("basic test", () => {
        // use toEqual for deep equality check
        expect(unHashPosition(0)).toEqual({ row: 0, column: 0 });
        expect(unHashPosition(1)).toEqual({ row: 0, column: 1 });
        expect(unHashPosition(45)).toEqual({ row: 4, column: 5 });
    });
});

describe("isWinner()", () => {
    test("empty board state returns false (no winner)", () => {
        const stateOfPositionsToCheckForWin = {};
        const winningStates = generateWinningStates();
        expect(isWinner(stateOfPositionsToCheckForWin, winningStates)).toBe(false);
    });

    test("4 in a row horizontal", () => {
        const stateOfPositionsToCheckForWin = Array.from({
            0: true,
            1: true,
            2: true,
            3: true,
            length: 42,
        });
        const winningStates = generateWinningStates();
        expect(isWinner(stateOfPositionsToCheckForWin, winningStates)).toBe(true);
    });

    test("4 in a row vertical", () => {
        const stateOfPositionsToCheckForWin = Array.from({
            0: true,
            10: true,
            20: true,
            30: true,
            length: 42,
        });
        const winningStates = generateWinningStates();
        expect(isWinner(stateOfPositionsToCheckForWin, winningStates)).toBe(true);
    });
    test("4 in a row diagonal leaning up-right", () => {
        const stateOfPositionsToCheckForWin = Array.from({
            0: true,
            11: true,
            22: true,
            33: true,
            length: 42,
        });
        const winningStates = generateWinningStates();
        expect(isWinner(stateOfPositionsToCheckForWin, winningStates)).toBe(true);
    });
    test("4 in a row diagonal leaning down-right", () => {
        const stateOfPositionsToCheckForWin = Array.from({
            3: true,
            12: true,
            21: true,
            30: true,
            length: 42,
        });
        const winningStates = generateWinningStates();
        expect(isWinner(stateOfPositionsToCheckForWin, winningStates)).toBe(true);
    });
});

describe("whosTheWinner()", () => {
    test("empty board state returns false (no winner)", () => {
        const board = { player1: [], player2: [] };
        const winningStates = generateWinningStates();
        expect(whosTheWinner({ board, winningStates })).toBe(false);
    });
    test("player 2 has 4 in a row horizontal", () => {
        const board = {
            player1: [],
            player2: Array.from({
                0: true,
                1: true,
                2: true,
                3: true,
                length: 42,
            }),
        };
        const winningStates = generateWinningStates();
        expect(whosTheWinner({ board, winningStates })).toBe("player2");
    });
});

describe("checkForStalemate()", () => {
    test("empty board state returns false (no stalemate)", () => {
        const stateOfPositionsToCheckForWin = { player1: [], player2: [] };
        const winningStates = generateWinningStates();
        expect(checkForStalemate(stateOfPositionsToCheckForWin, winningStates)).toBe(false);
    });
    test("board state with 1 move returns false (no stalemate)", () => {
        const stateOfPositionsToCheckForWin = { player1: [{ row: 0, column: 0 }], player2: [] };
        const winningStates = generateWinningStates();
        expect(checkForStalemate(stateOfPositionsToCheckForWin, winningStates)).toBe(false);
    });
    test("board state with 41 moves returns false (no stalemate)", () => {
        const stateOfPositionsToCheckForWin = { player1: [], player2: [] };
        for (let i = 0; i < 41; i++) {
            stateOfPositionsToCheckForWin.player1.push(unHashPosition(i));
        }
        const winningStates = generateWinningStates();
        expect(checkForStalemate(stateOfPositionsToCheckForWin, winningStates)).toBe(false);
    });
    test("board state with 42 moves returns true (stalemate)", () => {
        const stateOfPositionsToCheckForWin = { player1: [], player2: [] };
        for (let i = 0; i < 42; i++) {
            stateOfPositionsToCheckForWin.player1.push(unHashPosition(i));
        }
        const winningStates = generateWinningStates();
        expect(checkForStalemate(stateOfPositionsToCheckForWin, winningStates)).toBe(true);
    });
});
