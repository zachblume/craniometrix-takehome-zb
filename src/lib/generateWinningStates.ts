const generateWinningStates = (): Positions[] => {
    const winningStates = [];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const horizontal = [],
                vertical = [],
                diagonal = [],
                diagonal2 = [];
            for (let k = 0; k < 4; k++) {
                horizontal.push({ row: i, column: j + k });
                vertical.push({ row: i + k, column: j });
                diagonal.push({ row: i + k, column: j + k });
                diagonal2.push({ row: i + k, column: j - k });
            }
            winningStates.push(horizontal, vertical, diagonal, diagonal2);
        }
    }
    return winningStates;
};
export default generateWinningStates;
