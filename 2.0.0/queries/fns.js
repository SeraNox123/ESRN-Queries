const fns1 = document.querySelector('input[value="33@wsRemoteOperation"]');
const fns2 = document.querySelector('input[value="34@wsRemoteOperation"]');
const fns3 = document.querySelector('input[value="35@wsRemoteOperation"]');
const fns4 = document.querySelector('input[value="37@wsRemoteOperation"]');
const fnsProcent = document.querySelector('input[value="108@wsRemoteOperation"]');
const inn = document.querySelector('input[value="40@wsRemoteOperation"]');

function fns(MSP, secondQuery) {
    switch (MSP) {
        case 'Субсидия': {
            if (secondQuery == false) {
                fns1.checked = true;
                fns2.checked = true;
                fns3.checked = true;
                fns4.checked = true;
                fnsProcent.checked = true;
            } else {
                fns1.checked = true;
                fns2.checked = true;
                fns4.checked = true;
            }
            break;
        }
        case 'Проезд': {
            if (secondQuery == false) {
                fns2.checked = true;
                fns3.checked = true;
            } else {
                fns2.checked = true;
            }
            break;
        }
        case 'Выплаты на детей': {
            if (secondQuery == false) {
                fns1.checked = true;
                fns2.checked = true;
                fns3.checked = true;
                fns4.checked = true;
                inn.checked = true;
            } else {
                fns1.checked = true;
                fns2.checked = true;
                fns4.checked = true;
            }
            break;
        }
        case 'Удостоверение ММС': {
            if (secondQuery == false) {
                fns1.checked = true;
                fns2.checked = true;
                fns3.checked = true;
                fns4.checked = true;
                inn.checked = true;
            } else {
                fns1.checked = true;
                fns2.checked = true;
                fns4.checked = true;
            }
            break;
        }
        default: {
            if (secondQuery == false) {
                fns1.checked = true;
                fns2.checked = true;
                fns3.checked = true;
                fns4.checked = true;
            } else {
                fns1.checked = true;
                fns2.checked = true;
                fns4.checked = true;
            }
            break;
        }
    }
}

function fnsData(MSP, year, secondQuery) {
    switch (MSP) {
        case 'Субсидия': {
            if (secondQuery == false) {
                document.getElementById("id_year@33@wsRemoteOperation").value = year;
                document.getElementById("id_year@34@wsRemoteOperation").value = year;
                document.getElementById("id_period@35@wsRemoteOperation").value = 3; // value for current and previous periods
                document.getElementById("id_reportYear@37@wsRemoteOperation").value = year;
                document.getElementById("id_year@108@wsRemoteOperation").value = year;
            } else {
                document.getElementById("id_year@33@wsRemoteOperation").value = year;
                document.getElementById("id_year@34@wsRemoteOperation").value = year;
                document.getElementById("id_reportYear@37@wsRemoteOperation").value = year;
            }
            break;
        }
        case 'Проезд': {
            if (secondQuery == false) {
                document.getElementById("id_year@34@wsRemoteOperation").value = year;
                document.getElementById("id_period@35@wsRemoteOperation").value = 3; // value for current and previous periods
            } else {
                document.getElementById("id_year@34@wsRemoteOperation").value = year;
            }
            break;
        }
        default: {
            if (secondQuery == false) {
                document.getElementById("id_year@33@wsRemoteOperation").value = year;
                document.getElementById("id_year@34@wsRemoteOperation").value = year;
                document.getElementById("id_period@35@wsRemoteOperation").value = 3; // value for current and previous periods
                document.getElementById("id_reportYear@37@wsRemoteOperation").value = year;
            } else {
                document.getElementById("id_year@33@wsRemoteOperation").value = year;
                document.getElementById("id_year@34@wsRemoteOperation").value = year;
                document.getElementById("id_reportYear@37@wsRemoteOperation").value = year;
            }
            break;
        }
    }
}