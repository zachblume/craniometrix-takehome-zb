const hash2DPositionTo1d = (position: Position) => {
    return position.row * 10 + position.column;
};
export default hash2DPositionTo1d;
