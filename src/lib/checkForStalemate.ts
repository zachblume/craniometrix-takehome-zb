const checkForStalemate = (playerPositions: Positions): Boolean => {
    return playerPositions.reduce((accumulator, player) => accumulator + player.length) === 42;
};
export default isStalemate;
