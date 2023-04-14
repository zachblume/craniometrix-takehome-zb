const checkForStalemate = (board: BoardType): Boolean => {
    let count = 0;
    for (let player of Object.values(board)) count += Object.keys(player).length;
    return count === 42;
};
export default checkForStalemate;
