import isWinner from "./isWinner";
const whosTheWinner = ({
    playerPositions,
    winningStates,
}: {
    playerPositions: Positions;
    winningStates: Positions;
}): string | boolean => {
    for (let player of playersPositions) {
        if (isWinner(player)) return player;
    }
    return false;
};
export default whosTheWinner;
