import isWinner from "./isWinner";
type whosTheWinnerProps = {
    board: BoardType;
    winningStates: Positions[];
};
const whosTheWinner = ({ board, winningStates }: whosTheWinnerProps): string | boolean => {
    for (let playerName in board) {
        if (isWinner(board[playerName], winningStates)) return playerName;
    }
    return false;
};
export default whosTheWinner;
