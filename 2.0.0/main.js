// тулбар, в котором будут размещены наши элементы
const divToolbar = document.querySelector('[class="tb_zone_right"]');
// все используемые ключи для хранения
const allKeys = ['currentPF', 'MSP', 'startOwnershipDate', 'secondQuery', 'applicantAddress', 'parentSnils', 'childSnils'];
// массив родственников
const relatives = [];
let relativeCurrent = 0;

/**
 * Создаёт элемент "select"
 *
 */
function createSelect() {
    // создаём массив МСП
    const selectArray = ["ЖКУ", "Субсидия", "Проезд", "Соц. контракт", "Выплаты на детей", "Удостоверение ММС", "Прописка", "ГДВ фед.", "Смерть + прописка", "Газ"];
    // создаём элемент select
    const selectMSP = document.createElement("select");
    selectMSP.id = "MSP";
    selectMSP.style.fontSize = "14px";
    // привязываем наш элемент к тулбару
    divToolbar.appendChild(selectMSP);

    // добавляем наш массив МСП в элемент select
    for (let i = 0; i < selectArray.length; i++) {
        // создаём элемент option и подставляем значение из массива МСП
        const option = document.createElement("option");
        option.value = selectArray[i];
        option.text = selectArray[i];
        selectMSP.appendChild(option);
    }
}

/**
 * Создаёт элемент "button";
 *
 */
function createChooseMSPButton() {
    const chooseButton = document.createElement("button");
    chooseButton.style.fontSize = "14px";
    chooseButton.innerHTML = "Выполнить запросы";
    // привязываем кнопку к тулбару
    divToolbar.appendChild(chooseButton);
    chooseButton.onclick = function () {
        main();
    };
}

/**
 * Создаёт элемент "button" для очистки ключей
 *
 */
function createCleanupButton() {
    const cleanupButton = document.createElement("button");
    cleanupButton.style.fontSize = "14px";
    cleanupButton.innerHTML = "Сброс";
    divToolbar.appendChild(cleanupButton);
    cleanupButton.onclick = async function () {
        await cleanup(allKeys);
    }
}
/**
 * Основная функция, вызывается по нажатию кнопки "Выполнить запросы"
 *
 * @return {*} 
 */
async function main() {
    // получаем value у select
    const select = document.querySelector('[id="MSP"]');
    let startOwnershipDate = null;
    let applicantAddress = null;
    let snils = null;
    // выполняем дополнительные действия в зависимости от выбранной МСП
    switch (select.value) {
        case 'Субсидия':
        case 'Газ': {
            address = getAddress();
            openProperty();
            propertyLoaded = await createObserver("Имущество");
            if (propertyLoaded) {
                startOwnershipDate = parsePropertyTable(address);
                if (startOwnershipDate == null || startOwnershipDate.length == 1) {
                    return;
                }
            }
            break;
        }
        case 'Соц. контракт': {
            applicantAddress = getAddress();
            break;
        }
        case 'Удостоверение ММС': {
            snils = getSnils();
            break;
        }
        case 'Прописка':
        case 'ГДВ фед.':
        case 'Смерть + прописка': {
            var applicantPort = chrome.runtime.connect({ name: "applicant" });
            applicantPort.onMessage.addListener(async function (msg) {
                if (msg.confirmation === 'query closed') {
                    await cleanup(allKeys);
                    window.close();
                    return;
                }
            });
            await saveObjectInLocalStorage({ 'currentPF': "Заявитель", 'MSP': select.value })
            openWebQueryForm();
            return;
        }
    }

    keys = {
        'currentPF': "Заявитель",
        'MSP': select.value,
        'startOwnershipDate': startOwnershipDate,
        'applicantAddress': applicantAddress,
        'parentSnils': snils,
        'secondQuery': false
    }
    await saveObjectInLocalStorage(keys);
    connectBackground();
    openWebQueryForm();
}

function connectBackground() {
    const applicantPort = chrome.runtime.connect({ name: "applicant" });
    applicantPort.onMessage.addListener(async function (msg) {
        if (msg.confirmation === 'first query closed') {
            await saveObjectInLocalStorage({ 'secondQuery': true })
            openWebQueryForm();
        } else if (msg.confirmation === 'query closed') {
            openGroups();
        } else {
            nextRelative(relatives);
        }
    });
}

function openWebQueryForm() {
    const webQueryButton = document.querySelector('[title="Веб запрос"]');
    webQueryButton.click();
}

async function openGroups() {
    const groupsButton = document.querySelector('[group="10271806"]');
    groupsButton.click();
    const groupsLoaded = await createObserver("Группы");
    if (groupsLoaded) {
        parseRelativesTable();
    }
}

function openProperty() {
    const propertyButton = document.querySelector('[group="10287216"]');
    propertyButton.click();
}

async function parseRelativesTable() {
    const relativesTable = document.querySelector('[attrname="Relatives"]');
    const atags = relativesTable.getElementsByTagName("a");
    const MSP = await getObjectFromLocalStorage('MSP');

    for (let i = 2; i < atags.length; i = i + 3) {
        // check if relative dead
        const relativeName = trimString(atags[i - 1].text);
        if (relativeName.includes(":")) { // skip person if true
            continue;
        }

        const relation = trimString(atags[i].text);
        switch (MSP) {
            case 'Выплаты на детей':
            case 'Удостоверение ММС': {
                switch (relation) {
                    case 'Муж':
                    case 'Жена':
                    case 'Сын':
                    case 'Дочь': {
                        relatives.push(relation);
                        relatives.push(atags[i - 1]);
                        break;
                    }
                }
                break;
            }
            case 'Проезд': {
                switch (relation) {
                    case 'Муж':
                    case 'Жена':
                    case 'Сын':
                    case 'Дочь':
                    case 'Другая степень родства, свойства': {
                        relatives.push(relation);
                        relatives.push(atags[i - 1]);
                        break;
                    }
                }
                break;
            }
            default: {
                relatives.push(relation);
                relatives.push(atags[i - 1]);
                break;
            }
        }
    }
    nextRelative(relatives);
}

async function nextRelative(relatives) {
    if (relativeCurrent < relatives.length) {
        if (relatives[relativeCurrent] == "Сын" || relatives[relativeCurrent] == "Дочь") {
            await saveObjectInLocalStorage({ 'currentPF': "Ребёнок" })
        } else if (relatives[relativeCurrent] == "Муж" || relatives[relativeCurrent] == "Жена") {
            await saveObjectInLocalStorage({ 'currentPF': "Супруг(а)" })
        } else {
            await saveObjectInLocalStorage({ 'currentPF': "Другое" })
        }

        MSP = await getObjectFromLocalStorage('MSP');

        switch (MSP) {
            case 'ЖКУ': {
                relatives[relativeCurrent + 1].click();
                relativeCurrent = relativeCurrent + 2;
                break;
            }
            case 'Проезд': {
                if (relatives[relativeCurrent] == "Сын" || relatives[relativeCurrent] == "Дочь" || relatives[relativeCurrent] == "Муж" || relatives[relativeCurrent] == "Жена" || relatives[relativeCurrent] == "Другая степень родства, свойства") {
                    relatives[relativeCurrent + 1].click();
                    relativeCurrent = relativeCurrent + 2;
                } else {
                    relativeCurrent = relativeCurrent + 2;
                    nextRelative(relatives);
                }
                break;
            }
            case 'Субсидия':
            case 'Соц. контракт':
            case 'Выплаты на детей':
            case 'Удостоверение ММС': {
                await saveObjectInLocalStorage({ 'secondQuery': false })
                relatives[relativeCurrent + 1].click();
                relativeCurrent = relativeCurrent + 2;
                break;
            }
        }
    } else {
        await cleanup(allKeys);
    }
}

function trimString(string) {
    let index = string.indexOf("\n");
    return newString = string.substring(0, index);
}

// отслеживаем статус загрузки вкладки в ЛД (Группы, имущество) 
async function createObserver(node) {
    let targetNode;
    switch (node) {
        case "Группы": {
            targetNode = document.querySelector('[id="group_10271806"]');
            break;
        }
        case "Имущество": {
            targetNode = document.querySelector('[id="group_10287216"]');
            break;
        }
    }

    const config = { attributes: true };

    function startObserver() {
        return new Promise(resolve => {
            observer = new MutationObserver(function (mutationsList, observer) {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && targetNode.getAttribute('loaded') == 'true') {
                        observer.disconnect();
                        resolve(true);
                    }
                }
            });
            observer.observe(targetNode, config);
        });
    }

    return result = await startObserver();
}

function parsePropertyTable(address) {
    const tableBody = document.querySelector('[id="grid_container_tbody_owinng"]');
    const tableRows = tableBody.querySelectorAll("tr");
    let startOwnershipDate = null;

    for (i = 0; i < tableRows.length; i++) {
        let row = tableRows[i];
        let propertyAddress = row.getElementsByTagName("a");
        propertyAddress = trimString(propertyAddress[0].text);
        if (propertyAddress == address) {
            endOwnershipDate = row.cells[7].innerText;
            if (endOwnershipDate.length == 1) { // если нет даты окончания
                startOwnershipDate = row.cells[6].innerText;
                if (startOwnershipDate.length == 1 || startOwnershipDate == null) {
                    continue;
                } else {
                    break;
                }
            }
        }
    }

    return startOwnershipDate;
}
/**
 * Проверяет в каком типе ЛД находимся
 *
 * @return {*} 
 */
async function inRelativePF() {
    currentPF = await getObjectFromLocalStorage('currentPF');
    if (currentPF == undefined) {
        return;
    }

    MSP = await getObjectFromLocalStorage('MSP');

    if (currentPF != "Заявитель") {
        var relativePort = chrome.runtime.connect({ name: "relative" });
        relativePort.onMessage.addListener(async function (msg) {
            if (msg.confirmation === 'first query closed') {
                await saveObjectInLocalStorage({ 'secondQuery': true })
                openWebQueryForm();
                return;
            } else if (msg.confirmation === 'query closed') {
                relativePort.postMessage({ confirmation: "relative closed" });
                setTimeout('window.close()', 1000);
            }
        });

        if (MSP == "Соц. контракт" && currentPF == "Другое") {
            relativeAddress = getAddress();
            if (relativeAddress != applicantAddress) {
                relativePort.postMessage({ confirmation: "relative closed" });
                setTimeout('window.close()', 1000);
            } else {
                openWebQueryForm();
            }
        } else if (MSP == "Удостоверение ММС" && currentPF == "Ребёнок") {
            const snils = getSnils();
            await saveObjectInLocalStorage({ 'childSnils': snils })
            openWebQueryForm();
        } else {
            openWebQueryForm();
        }
    }
}

function getAddress() {
    const address = document.querySelector('[id="title_regFlat"]');
    return address.value;
}

function getSnils() {
    const snils = document.getElementById("id_snils").value;
    return snils;
}

async function cleanup(keys) {
    await removeObjectFromLocalStorage(keys);
}

function isInPersonalFile() { // checking if window is personal file
    const windowTitle = document.getElementsByTagName("title")[0];
    if (windowTitle.innerHTML.indexOf("Личное") !== -1) {
        return true;
    } else {
        return false;
    }
}

if (isInPersonalFile() === true) {
    createSelect();
    createChooseMSPButton();
    createCleanupButton();
}

inRelativePF();
