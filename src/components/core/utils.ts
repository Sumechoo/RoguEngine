export function getRandomItem<T>(array: ReadonlyArray<T>): T {
    const length = array.length;

    return array[Math.floor(Math.random() * length)];
}

export function getRandomShift(n = 0.5) {
    return (Math.random() * (n/2)) - n;
}