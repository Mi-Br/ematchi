// Fisher–Yates_shuffle algorithm
export function shuffle<T>(array: T[]) {
    let i = array.length

    while (i--) {
        const k = Math.floor(Math.random() * i + 1)
        const temp = array[i];
        array[i] = array[k]
        array[k] = temp;
    }
    return array
}