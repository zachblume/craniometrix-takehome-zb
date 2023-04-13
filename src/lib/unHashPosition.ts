const unHashPosition = (num: number | string): Position => {
    const row = Math.floor(Number(num) / 10);
    const column = Number(num) % 10;
    return { row, column };
};
export default unHashPosition;
