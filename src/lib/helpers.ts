export function shuffleArray<T>(array: T[]): T[] {
    // https://stackoverflow.com/a/12646864/1238150
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return [...array];
}
