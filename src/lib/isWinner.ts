// isWinnerProps type
import hash2DPositionTo1d from "./hash2DPositionTo1d";

const isWinner = (stateOfPositionsToCheckForWin: HashOfPositions, winningStates: Positions[]) => {
    for (let winningState of winningStates) {
        let allConditionsMet = true;
        for (let necessaryPosition of winningState) {
            if (!stateOfPositionsToCheckForWin[hash2DPositionTo1d(necessaryPosition)]) {
                allConditionsMet = false;
                break; // if missing a necessary position, move on to the next winning state.
            }
        }
        if (allConditionsMet) return true; // if the player has all the positions in the winning state, return true.
    }
    return false;
};
export default isWinner;
