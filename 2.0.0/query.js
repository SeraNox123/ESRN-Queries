// buttons on form
const nextButton = document.querySelector('[id="nextData"]');

var queryApplicantPort;
var queryRelativePort;

async function main() {
    const extension = await isUsingExtension();
    if (extension != true) {
        return;
    }

    const MSP = await getObjectFromLocalStorage('MSP');
    const currentPF = await getObjectFromLocalStorage('currentPF');
    let secondQuery = await getObjectFromLocalStorage('secondQuery');

    if (checkQueryPart() == "Выбор запросов") {
        selectQueries(MSP, currentPF, secondQuery);
    } else {
        queryData(MSP, currentPF, secondQuery);
    }
}

/**
 * Проверяет: запущены запросы вручную или через расширение
 * @returns bool
 */
async function isUsingExtension() {
    const MSP = await getObjectFromLocalStorage('MSP');
    if (MSP == undefined) {
        return false;
    } else {
        return true;
    }
}
/**
 * Проверяет: на каком этапе запросов находимся
 *
 * @return string 
 */
function checkQueryPart() {
    // форма запросов не меняет url, отслеживаем этап запроса по названию
    const table = document.querySelector('[class="list"]');
    const pageName = table.rows[0].cells[0].textContent;

    if (pageName.indexOf("Запрос") !== -1) {
        return "Выбор запросов";
    } else {
        return "Заполнение запросов";
    }
}

function selectQueries(MSP, currentPF, secondQuery) {
    const orgButton = document.querySelector('[class="OrgImg"]'); // для расширения списка, без нажатия не даст нажать кнопку "Дальше"
    switch (MSP) {
        case 'ЖКУ': {
            switch (currentPF) {
                case 'Заявитель':
                    rosreestr();
                    mvd(MSP);
                    orgButton.click();
                    nextButton.click();
                    break;
                default:
                    mvd(MSP);
                    orgButton.click();
                    nextButton.click();
                    break;
            }
            break;
        }

        case 'Субсидия': {
            switch (currentPF) {
                case 'Заявитель': {
                    if (secondQuery == false) {
                        pfr(MSP, currentPF);
                        rosreestr();
                        fns(MSP, secondQuery);
                        fss();
                        orgButton.click();
                        nextButton.click();
                        break;
                    } else {
                        fns(MSP, secondQuery);
                        orgButton.click();
                        nextButton.click();
                        break;
                    }
                }
                default: {
                    if (secondQuery == false) {
                        fns(MSP, secondQuery);
                        fss();
                        orgButton.click();
                        nextButton.click();
                        break;
                    } else {
                        fns(MSP, secondQuery);
                        orgButton.click();
                        nextButton.click();
                        break;
                    }
                }
            }
            break;
        }

        case 'Проезд': {
            switch (currentPF) {
                case 'Ребёнок': {
                    mvd(MSP);
                    orgButton.click();
                    nextButton.click();
                    break;
                }
                default: {
                    if (secondQuery == false) {
                        ktzn(MSP);
                        mvd(MSP);
                        fns(MSP, secondQuery);
                        fss();
                        orgButton.click();
                        nextButton.click();
                    } else {
                        fns(MSP, secondQuery);
                        fss();
                        orgButton.click();
                        nextButton.click();
                    }
                    break;
                }
            }
            break;
        }

        case 'Соц. контракт': {
            switch (currentPF) {
                case 'Ребёнок': {
                    mvd(MSP);
                    rosreestr();
                    orgButton.click();
                    nextButton.click();
                    break;
                }
                default: {
                    if (secondQuery == false) {
                        ktzn(MSP);
                        mvd(MSP);
                        rosreestr();
                        fns(MSP, secondQuery);
                        fss();
                        orgButton.click();
                        nextButton.click();
                    } else {
                        fns(MSP, secondQuery);
                        fss();
                        orgButton.click();
                        nextButton.click();
                    }
                    break;
                }
            }
            break;
        }

        case 'Выплаты на детей': {
            switch (currentPF) {
                case 'Ребёнок': {
                    zags(MSP, currentPF);
                    mvd(MSP);
                    pfr(MSP, currentPF);
                    orgButton.click();
                    nextButton.click();
                    break;
                }
                default: {
                    if (secondQuery == false) {
                        zags(MSP, currentPF);
                        ktzn(MSP);
                        mvd(MSP);
                        fns(MSP, secondQuery);
                        fss();
                        pfr(MSP, currentPF);
                        orgButton.click();
                        nextButton.click();
                    } else {
                        fns(MSP, secondQuery);
                        fss();
                        orgButton.click();
                        nextButton.click();
                    }
                    break;
                }
            }
            break;
        }

        case 'Удостоверение ММС': {
            switch (currentPF) {
                case 'Ребёнок': {
                    zags(MSP, currentPF);
                    mvd(MSP);
                    pfr(MSP, currentPF);
                    orgButton.click();
                    nextButton.click();
                    break;
                }
                default: {
                    if (secondQuery == false) {
                        zags(MSP, currentPF);
                        ktzn(MSP);
                        mvd(MSP);
                        fns(MSP, secondQuery);
                        fss();
                        pfr(MSP, currentPF);
                        orgButton.click();
                        nextButton.click();
                    } else {
                        fns(MSP, secondQuery);
                        fss();
                        orgButton.click();
                        nextButton.click();
                    }
                    break;
                }
            }
            break;
        }
        case 'Прописка': {
            mvd(MSP);
            orgButton.click();
            nextButton.click();
            break;
        }
        case 'ГДВ фед.': {
            mvd(MSP);
            pfr(MSP, currentPF);
            orgButton.click();
            nextButton.click();
            break;
        }
        case 'Смерть + прописка': {
            zags(MSP, currentPF);
            mvd(MSP);
            orgButton.click();
            nextButton.click();
            break;
        }
        case 'Газ': {
            switch (currentPF) {
                case 'Заявитель': {
                    if (secondQuery == "false") {
                        mvd();
                        pfr(MSP, currentPF);
                        rosreestr();
                        fns(MSP, secondQuery);
                        fss();
                        orgButton.click();
                        nextButton.click();
                        break;
                    } else {
                        fns(MSP, secondQuery);
                        orgButton.click();
                        nextButton.click();
                        break;
                    }
                }
                default: {
                    if (secondQuery == "false") {
                        mvd();
                        fns(MSP, secondQuery);
                        fss();
                        orgButton.click();
                        nextButton.click();
                        break;
                    } else {
                        fns(MSP, secondQuery);
                        orgButton.click();
                        nextButton.click();
                        break;
                    }
                }
            }
            break;
        }
    }
}

async function queryData(MSP, currentPF, secondQuery) {
    if (currentPF == "Заявитель") {
        queryApplicantPort = chrome.runtime.connect({ name: "queryApplicant" })
    } else {
        queryRelativePort = chrome.runtime.connect({ name: "queryRelative" })
    }

    switch (MSP) {
        case 'ЖКУ': {
            switch (currentPF) {
                case 'Заявитель':
                    mvdData();
                    nextButton.click();
                    setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                    setTimeout('window.close()', 1000);
                    break;
                default: {
                    mvdData();
                    nextButton.click();
                    setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                    setTimeout('window.close()', 1000);
                    break;
                }
            }
            break;
        }
        case 'Субсидия': {
            switch (currentPF) {
                case 'Заявитель': {
                    if (secondQuery == false) {
                        pfrData(MSP, currentPF);
                        ownershipDate = await getObjectFromLocalStorage('startOwnershipDate');
                        rosreestrData(ownershipDate);
                        fnsData(MSP, previuosYear, secondQuery);
                        fssData(firstDayOfPreviousYear);
                        nextButton.click();
                        if (currentMonth < 7) {
                            setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                            setTimeout('window.close()', 1000);
                        } else {
                            setTimeout('queryApplicantPort.postMessage({ message: "first query closed" })', 1000);
                            setTimeout('window.close()', 1000);
                        }
                    } else {
                        fnsData(MSP, currentYear, secondQuery);
                        fssData(firstDayOfCurrentYear);
                        nextButton.click();
                        setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                        setTimeout('window.close()', 1000);
                    }
                    break;
                }
                default: {
                    if (secondQuery == false) {
                        fnsData(MSP, previuosYear, secondQuery);
                        fssData(firstDayOfPreviousYear);
                        nextButton.click();
                        if (currentMonth < 7) {
                            setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                            setTimeout('window.close()', 1000);
                        } else {
                            setTimeout('queryRelativePort.postMessage({ message: "first query closed" })', 1000);
                            setTimeout('window.close()', 1000);
                        }
                    } else {
                        fnsData(MSP, currentYear, secondQuery);
                        fssData(firstDayOfCurrentYear);
                        nextButton.click();
                        setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                        setTimeout('window.close()', 1000);
                    }
                    break;
                }
            }
            break;
        }

        case 'Проезд': {
            switch (currentPF) {
                case 'Ребёнок': {
                    mvdData();
                    nextButton.click();
                    setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                    setTimeout('window.close()', 1000);
                    break;
                }
                default: {
                    if (secondQuery == false) {
                        ktznData(getDateFromMonthsBack(3));
                        mvdData();
                        if (currentMonth < 3) {
                            fnsData(MSP, previuosYear, secondQuery);
                            fssData(firstDayOfPreviousYear);
                            await saveObjectInLocalStorage({ 'secondQuery': true })
                        } else {
                            fnsData(MSP, currentYear, secondQuery);
                            fssData(firstDayOfCurrentYear);
                        }

                        nextButton.click();
                        if (currentPF == "Заявитель" && currentMonth < 3) {
                            setTimeout('queryApplicantPort.postMessage({ message: "first query closed" })', 1000);
                        } else if (currentPF == "Заявитель" && currentMonth > 2) {
                            setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                        }

                        if (currentPF != "Заявитель" && currentMonth < 3) {
                            setTimeout('queryRelativePort.postMessage({ message: "first query closed" })', 1000);
                        } else if (currentPF != "Заявитель" && currentMonth > 2) {
                            setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                        }
                        setTimeout('window.close()', 1000);
                    } else {
                        fnsData(MSP, currentYear, secondQuery);
                        fssData(firstDayOfCurrentYear);
                        nextButton.click();
                        if (currentPF == "Заявитель") {
                            setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                        } else {
                            setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                        }
                        setTimeout('window.close()', 1000);
                    }
                    break;
                }
            }
            break;
        }

        case 'Соц. контракт': {
            switch (currentPF) {
                case 'Ребёнок': {
                    mvdData();
                    nextButton.click();
                    setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                    setTimeout('window.close()', 1000);
                    break;
                }
                default: {
                    if (secondQuery == false) {
                        ktznData(getDateFromMonthsBack(3));
                        mvdData();
                        if (currentMonth < 3) {
                            fnsData(MSP, previuosYear, secondQuery);
                            fssData(firstDayOfPreviousYear);
                            await saveObjectInLocalStorage({ 'secondQuery': true })
                        } else {
                            fnsData(MSP, currentYear, secondQuery);
                            fssData(firstDayOfCurrentYear);
                        }

                        nextButton.click();
                        if (currentPF == "Заявитель" && currentMonth < 3) {
                            setTimeout('queryApplicantPort.postMessage({ message: "first query closed" })', 1000);
                        } else if (currentPF == "Заявитель" && currentMonth > 2) {
                            setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                        }

                        if (currentPF != "Заявитель" && currentMonth < 3) {
                            setTimeout('queryRelativePort.postMessage({ message: "first query closed" })', 1000);
                        } else if (currentPF != "Заявитель" && currentMonth > 2) {
                            setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                        }
                        setTimeout('window.close()', 1000);
                    } else {
                        fnsData(MSP, currentYear, secondQuery);
                        fssData(firstDayOfCurrentYear);
                        nextButton.click();
                        if (currentPF == "Заявитель") {
                            setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                        } else {
                            setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                        }
                        setTimeout('window.close()', 1000);
                    }
                    break;
                }
            }
            break;
        }

        case 'Выплаты на детей': {
            switch (currentPF) {
                case 'Ребёнок': {
                    mvdData();
                    nextButton.click();
                    setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                    setTimeout('window.close()', 1000);
                    break;
                }
                default: {
                    if (secondQuery == false) {
                        ktznData(getDateFromMonthsBack(3));
                        mvdData();
                        if (currentMonth < 6) {
                            fnsData(MSP, previuosYear, secondQuery);
                            fssData(firstDayOfPreviousYear);
                            await saveObjectInLocalStorage({ 'secondQuery': true })
                        } else {
                            fnsData(MSP, currentYear, secondQuery);
                            fssData(firstDayOfCurrentYear);
                        }
                        nextButton.click();
                        if (currentPF == "Заявитель" && currentMonth < 6) {
                            setTimeout('queryApplicantPort.postMessage({ message: "first query closed" })', 1000);
                        } else if (currentPF == "Заявитель" && currentMonth > 5) {
                            setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                        }

                        if (currentPF != "Заявитель" && currentMonth < 6) {
                            setTimeout('queryRelativePort.postMessage({ message: "first query closed" })', 1000);
                        } else if (currentPF != "Заявитель" && currentMonth > 5) {
                            setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                        }
                        setTimeout('window.close()', 1000);
                    } else {
                        fnsData(MSP, currentYear, secondQuery);
                        fssData(firstDayOfCurrentYear);
                        nextButton.click();
                        if (currentPF == "Заявитель") {
                            setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                        } else {
                            setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                        }
                        setTimeout('window.close()', 1000);
                    }
                    break;
                }
            }
            break;
        }

        case 'Удостоверение ММС': {
            switch (currentPF) {
                case 'Ребёнок': {
                    mvdData();
                    pfrData(MSP, currentPF);
                    nextButton.click();
                    setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                    setTimeout('window.close()', 1000);
                    break;
                }
                default: {
                    if (secondQuery == false) {
                        ktznData(getDateFromMonthsBack(16), getDateFromMonthsBack(4));
                        mvdData();
                        pfrData(MSP, currentPF);
                        if (currentMonth != 4) {
                            fnsData(MSP, twoYearsBack, secondQuery);
                            fssData(firstDayOfTwoYearsBack);
                            await saveObjectInLocalStorage({ 'secondQuery': true })
                        } else {
                            fnsData(MSP, previuosYear, secondQuery);
                            fssData(firstDayOfPreviousYear);
                        }
                        nextButton.click();
                        if (currentPF == "Заявитель" && currentMonth != 4) {
                            setTimeout('queryApplicantPort.postMessage({ message: "first query closed" })', 1000);
                        } else if (currentPF == "Заявитель" && currentMonth == 4) {
                            setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                        }

                        if (currentPF != "Заявитель" && currentMonth != 4) {
                            setTimeout('queryRelativePort.postMessage({ message: "first query closed" })', 1000);
                        } else if (currentPF != "Заявитель" && currentMonth == 4) {
                            setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                        }
                        setTimeout('window.close()', 1000);
                    } else {
                        fnsData(MSP, previuosYear, secondQuery);
                        fssData(firstDayOfPreviousYear);
                        nextButton.click();
                        if (currentPF == "Заявитель") {
                            setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                        } else {
                            setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                        }
                        setTimeout('window.close()', 1000);
                    }
                    break;
                }
            }
            break;
        }
        case 'Прописка':
        case 'Смерть + прописка': {
            mvdData();
            nextButton.click();
            setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
            setTimeout('window.close()', 1000);
            break;
        }
        case 'ГДВ фед.': {
            mvdData();
            pfrData(MSP, currentPF);
            nextButton.click();
            setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
            setTimeout('window.close()', 1000);
            break;
        }
        case 'Газ': {
            switch (currentPF) {
                case 'Заявитель': {
                    if (secondQuery == "false") {
                        mvdData();
                        pfrData(MSP, currentPF);
                        ownershipDate = await getObjectFromLocalStorage('startOwnershipDate');
                        rosreestrData(ownershipDate);
                        fnsData(MSP, previuosYear, secondQuery);
                        fssData(firstDayOfPreviousYear);
                        nextButton.click();
                        if (currentMonth < 7) {
                            setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                            setTimeout('window.close()', 1000);
                        } else {
                            setTimeout('queryApplicantPort.postMessage({ message: "first query closed" })', 1000);
                            setTimeout('window.close()', 1000);
                        }
                    } else {
                        fnsData(MSP, currentYear, secondQuery);
                        fssData(firstDayOfCurrentYear);
                        nextButton.click();
                        setTimeout('queryApplicantPort.postMessage({ message: "query closed" })', 1000);
                        setTimeout('window.close()', 1000);
                    }
                    break;
                }
                default: {
                    if (secondQuery == "false") {
                        mvdData();
                        fnsData(MSP, previuosYear, secondQuery);
                        fssData(firstDayOfPreviousYear);
                        nextButton.click();
                        if (currentMonth < 7) {
                            setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                            setTimeout('window.close()', 1000);
                        } else {
                            setTimeout('queryRelativePort.postMessage({ message: "first query closed" })', 1000);
                            setTimeout('window.close()', 1000);
                        }
                    } else {
                        fnsData(MSP, currentYear, secondQuery);
                        fssData(firstDayOfCurrentYear);
                        nextButton.click();
                        setTimeout('queryRelativePort.postMessage({ message: "query closed" })', 1000);
                        setTimeout('window.close()', 1000);
                    }
                    break;
                }
            }
            break;
        }
    }
}

main();