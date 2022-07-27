const registration = document.querySelector('input[value="43@wsRemoteOperation"]');
const vehicle = document.querySelector('input[value="84@wsRemoteOperation"]');

function mvd(MSP) {
    switch (MSP) {
        case 'Соц. контракт': {
            registration.checked = true;
            vehicle.checked = true;
            break;
        }
        default: {
            registration.checked = true;
            break;
        }
    }
}

function mvdData() {
    const govService = "addVacancyProvision1 addVacancyProvision1"; // doesn't matter which one you choose, selecting first in list
    document.getElementById("title_ServiceCode@43@wsRemoteOperation").value = govService;
    document.getElementById("id_ServiceCode@43@wsRemoteOperation").value = "309@sprPublicService"; // internal id, not visible on form
}