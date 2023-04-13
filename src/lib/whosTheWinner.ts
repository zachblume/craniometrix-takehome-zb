const whosTheWinner = ({ playerPositions, winningStates }) => {
    for (let player of playersPositions) {
        if (isWinner(player)) return player;
    }
    return false;
};
export default whosTheWinner;
