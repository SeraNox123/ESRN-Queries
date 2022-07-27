const unemployed = document.querySelector('input[value="61@wsRemoteOperation"]');
const payment = document.querySelector('input[value="62@wsRemoteOperation"]');

function ktzn(MSP) {
    switch (MSP) {
        case 'Проезд': {
            unemployed.checked = true;
            payment.checked = true;
            break;
        }
        default: {
            payment.checked = true;
            break;
        }
    }
}

function ktznData(beginDate, endDate) {
    beginDate = convertDate(beginDate);
    document.getElementById("data(dateStart@62@wsRemoteOperation)").value = beginDate;
    if (endDate !== undefined) {
        endDate = convertDate(endDate);
        document.getElementById("data(dateEnd@62@wsRemoteOperation)").value = endDate;
    }
}