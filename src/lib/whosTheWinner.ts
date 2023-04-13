import isWinner from "./isWinner";
const whosTheWinner = ({
    playerPositions,
    winningStates,
}: {
    playerPositions: Players;
    winningStates: Positions[];
}): string | boolean => {
    for (let [playerName, playerState] of Object.entries(playerPositions)) {
        if (isWinner(playerState, winningStates)) return playerName;
    }
    return false;
};
export default whosTheWinner;
