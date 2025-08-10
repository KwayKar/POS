export const arraysMatch = (a = [], b = []) => {
    if (a.length !== b.length) return false;
    return a.every((itemA) =>
        b.some((itemB) => JSON.stringify(itemA) === JSON.stringify(itemB))
    );
};