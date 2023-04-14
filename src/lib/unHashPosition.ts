const unHashPosition = (num: number | string): Position => {
    return { row: Math.floor(Number(num) / 10), column: Number(num) % 10 };
};
export default unHashPosition;
