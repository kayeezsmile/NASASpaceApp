import getRoundedValue from '../functions/getRoundedValue';

export default function getSliderMarks (
    minValue: number,
    maxValue: number,
    unit: string,
    isYear: boolean
) {

    let firstMiddleMark = (maxValue - minValue) / 3;
    let secondMiddleMark = 2 * firstMiddleMark;

    if (isYear) {

        firstMiddleMark += minValue;
        secondMiddleMark += minValue;

        firstMiddleMark = Math.trunc(firstMiddleMark);
        secondMiddleMark = Math.trunc(secondMiddleMark);
    }

    return [
        {
            value: minValue,
            label: minValue + ' ' + (unit ? unit : '')
        },
        {
            value: firstMiddleMark,
            label: getRoundedValue(firstMiddleMark.toString()) + ' ' + (unit ? unit : '')
        },
        {
            value: secondMiddleMark,
            label: getRoundedValue(secondMiddleMark.toString()) + ' ' + (unit ? unit : '')
        },
        {
            value: maxValue,
            label: maxValue + ' ' + (unit ? unit : '')
        }
    ];
}