const egrn = document.querySelector('input[value="87@wsRemoteOperation"]');

function rosreestr() {
    egrn.checked = true;
}

function rosreestrData(date) {
    date = convertDate(date);
    document.getElementById("data(periodStartDate@87@wsRemoteOperation)").value = date; // internal
}