export function padStart(num: string, length: number = 2) {
    let index = 0;

    for (let i = 0; i < num.length; i++) {
        if (num.at(i) == '0' && i < num.length - 1) {
            continue;
        }

        index = i;
        break;
    }

    return '0'.repeat(length - Math.min(length, num.length - index)) + num.slice(index);
}

export function time(hours: number, mins: number, secs: number) {
    return hours * 3600 + mins * 60 + secs;
}
