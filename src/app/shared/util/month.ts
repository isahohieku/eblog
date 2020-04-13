const month = [];
month[0] = 'Jan';
month[1] = 'Feb';
month[2] = 'Mar';
month[3] = 'Apr';
month[4] = 'May';
month[5] = 'Jun';
month[6] = 'Jul';
month[7] = 'Aug';
month[8] = 'Sep';
month[9] = 'Oct';
month[10] = 'Nov';
month[11] = 'Dec';

const monthFull = [];
monthFull[0] = 'January';
monthFull[1] = 'February';
monthFull[2] = 'March';
monthFull[3] = 'April';
monthFull[4] = 'May';
monthFull[5] = 'June';
monthFull[6] = 'July';
monthFull[7] = 'August';
monthFull[8] = 'September';
monthFull[9] = 'October';
monthFull[10] = 'November';
monthFull[11] = 'December';

export default function getMonth(value) {
    return month[value];
}

export function getMonthFull(value) {
    return monthFull[value];
}
