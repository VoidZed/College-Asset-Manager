import dayjs from 'dayjs';

const currentYear = Number(dayjs().year());
export const batchYear = []


for (var i = 0; i <= 3; i++) {
    var next = currentYear - i;
    var prev = currentYear - i - 1;
    var str = String(prev) + '-' + String(next)
    batchYear.push(str);
}