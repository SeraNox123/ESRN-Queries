const death = document.querySelector('input[value="75@wsRemoteOperation"]');
const birth = document.querySelector('input[value="100@wsRemoteOperation"]');
const marriage = document.querySelector('input[value="77@wsRemoteOperation"]');
const divorce = document.querySelector('input[value="94@wsRemoteOperation"]');

function zags(MSP, currentPF) {
    switch (MSP) {
        case 'Выплаты на детей': {
            switch (currentPF) {
                case 'Ребёнок': {
                    death.checked = true;
                    birth.checked = true;
                    break;
                }
                default: {
                    marriage.checked = true;
                    divorce.checked = true;
                }
            }
            break;
        }
        case 'Удостоверение ММС': {
            switch (currentPF) {
                case 'Ребёнок': {
                    death.checked = true;
                    birth.checked = true;
                    break;
                }
                default: {
                    marriage.checked = true;
                    divorce.checked = true;
                }
            }
            break;
        }
        case 'Смерть + прописка': {
            death.checked = true;
            break;
        }
    }
}