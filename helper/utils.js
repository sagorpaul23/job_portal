export function nFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}
export const salary = (text) => {
    if (text === 'week') {
        return 'per weekly'
    } else if (text === 'month') {
        return "per monthly"
    } else if (text === 'quarter') {
        return "per quarterly"
    } else {
        return 'per yearly'
    }
}