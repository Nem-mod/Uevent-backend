function diffIsOneDay(d: Date, pv: Date) {
    const diffInMs = d.getTime() - pv.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    if (diffInDays <= 1) {
        return true;
    }
    return false;
}

export function groupDatesByDay(dates: Date[]): Date[][] | [] {
    if (!dates || !dates.length) return [];
    console.log(dates);
    const sortedDates = [...new Set(dates)].sort((a, b) => a.getTime() - b.getTime());

    console.log(sortedDates);
    const result: Date[][] = [];
    let first = sortedDates[0];
    let last = sortedDates[0];
    for (let i = 1; i < sortedDates.length; i++) {
        last = sortedDates[i];
        if (!diffIsOneDay(last, sortedDates[i - 1])) {
            if (first !== sortedDates[i - 1]) {
                const tempGroup: Date[] = [first, sortedDates[i - 1]];
                result.push(tempGroup);
            } else {
                const tempDate = new Date(first.getTime() + (24 * 60 * 60 * 1000));
                const tempGroup: Date[] = [first, tempDate];
                result.push(tempGroup);
            }
            first = last;
        }
    }
    if (first !== last)
        result.push([first, last]);
    else {
        const tempDate = new Date(last.getTime() + (24 * 60 * 60 * 1000));
        result.push([last, tempDate]);
    }
    return result;
}
