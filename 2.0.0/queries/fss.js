const directPayments = document.querySelector('input[value="60@wsRemoteOperation"]');

function fss() {
    directPayments.checked = true;
}

function fssData(date) {
    document.getElementById("data(dateFrom@60@wsRemoteOperation)").value = date;
}