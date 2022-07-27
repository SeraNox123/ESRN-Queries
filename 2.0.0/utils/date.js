// date variables and constants
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const previuosYear = currentYear - 1;
const twoYearsBack = currentYear - 2;
const firstDayOfPreviousYear = "01.01." + previuosYear;
const firstDayOfCurrentYear = "01.01." + currentYear;
const firstDayOfTwoYearsBack = "01.01." + twoYearsBack;

// four months back, then take full year from that date
const fourMonthsBack = new Date();
fourMonthsBack.setMonth(fourMonthsBack.getMonth() - 4, 1);
const twelveMonthsBackFromFour = new Date(fourMonthsBack);
twelveMonthsBackFromFour.setMonth(twelveMonthsBackFromFour.getMonth() - 12, 1);
const oneMonthBack = new Date(fourMonthsBack);
oneMonthBack.setMonth(oneMonthBack.getMonth(), 0);

const twelveMonthsBack = new Date();
twelveMonthsBack.setMonth(twelveMonthsBack.getMonth() - 12, 1);
const sixMonthsBack = new Date();
sixMonthsBack.setMonth(sixMonthsBack.getMonth() - 6, 0);

// returns milliseconds from 01.01.1970
function convertDate(date) {
    date = date.split('.');
    const us_date = date.reverse().join('-');
    const convertedDate = new Date(us_date);
    return convertedDate.getTime();
}

function getDateFromMonthsBack(months) {
    let newDate = new Date();
    newDate.setMonth(currentMonth - months);
    newDate.setDate(1);
    newDate = newDate.toLocaleString('ru',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    return newDate;
}