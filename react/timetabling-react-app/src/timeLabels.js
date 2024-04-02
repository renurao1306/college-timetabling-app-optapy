const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)

export function generateTimeLabels(startTime, endTime, duration, unit) {
    let arrRet = [];

    console.log("Generating time lavels", startTime, endTime, duration);

    let currDJS = dayjs(startTime, 'HH:mm:ss');
    // console.log(currDJS);

    let endDJS = dayjs(endTime, 'HH:mm:ss');

    while (currDJS.isSameOrBefore(endDJS)) {
        arrRet.push(currDJS.format('HH:mm:ss'))
        currDJS = currDJS.add(duration, unit);
    }

    return arrRet;

}