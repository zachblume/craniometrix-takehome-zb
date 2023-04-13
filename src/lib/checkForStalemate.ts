const checkForStalemate = (playerPositions: Players): Boolean => {
    let count = 0;
    for (let player of Object.values(playerPositions)) {
        count += Object.keys(player).length;
    }
    return count === 42;
};
export default checkForStalemate;
