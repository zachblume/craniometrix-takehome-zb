const isWinner = (stateOfPositionsToCheckForWin: Position[]) => {
    for (let winningState of winningStates) {
        for (let necessaryPosition of winningState) {
            if (!stateOfPositionsToCheckForWin[necessaryPosition]) {
                continue; // if missing a necessary position, move on to the next winning state.
            }
            return true; // if the player has all the positions in the winning state, return true.
        }
    }
    return false;
};
export default isWinner;
