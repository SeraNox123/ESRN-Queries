const snils = document.querySelector('input[value="31@wsRemoteOperation"]');
const egisso103 = document.querySelector('input[value="50@wsRemoteOperation"]');
const egisso105 = document.querySelector('input[value="82@wsRemoteOperation"]');
const deprivation = document.querySelector('input[value="79@wsRemoteOperation"]');
const disabledExcerpt = document.querySelector('input[value="58@wsRemoteOperation"]');

function pfr(MSP, currentPF) {
    switch (MSP) {
        case 'Выплаты на детей': {            
            snils.checked = true;
            break;
        }
        case 'Удостоверение ММС': {
            switch (currentPF) {
                case 'Ребёнок': {
                    snils.checked = true;
                    egisso103.checked = true;
                    egisso105.checked = true;
                    deprivation.checked = true;
                    break;
                }
                default: {
                    snils.checked = true;
                    egisso103.checked = true;
                    egisso105.checked = true;
                }
            }
            break;
        }
        case 'Субсидия': {
            egisso103.checked = true;
            break;
        }
        case 'ГДВ фед.': {      
            egisso103.checked = true;
            disabledExcerpt.checked = true;
            break;
        }
    }
}

function pfrData(MSP, currentPF) {
    switch (MSP) {
        case 'Субсидия': {
            document.getElementById("id_npaInfo@50@wsRemoteOperation").value = "2681@pprNpdArticle";
            document.getElementById("id_serviceTitle@50@wsRemoteOperation").value = "614@sprPublicService";
            document.getElementById("data(beginDate@50@wsRemoteOperation)").value = convertDate(twelveMonthsBack.toLocaleDateString());
            document.getElementById("data(endDate@50@wsRemoteOperation)").value = convertDate(sixMonthsBack.toLocaleDateString());
            document.getElementById("id_assignmentsInclude@50@wsRemoteOperation").value = "true";
            document.getElementById("id_onmszCode@50@wsRemoteOperation").value = "173804@sprOsznDep";
            document.getElementById("id_mszGroup@50@wsRemoteOperation").value = "1@diSmev3EGISSObySnilsMSZgroup";
            break;
        }
        case 'ГДВ фед.': {
            document.getElementById("data(beginDate@50@wsRemoteOperation)").value = convertDate(firstDayOfPreviousYear);
            document.getElementById("id_assignmentsInclude@50@wsRemoteOperation").value = "true";
            document.getElementById("id_onmszCode@50@wsRemoteOperation").value = "173804@sprOsznDep";
            document.getElementById("id_mszGroup@50@wsRemoteOperation").value = "1@diSmev3EGISSObySnilsMSZgroup";
            break;
        }
        default: {
            switch (currentPF) {
                case 'Ребёнок': {
                    // deprivation
                    document.getElementById("id_parentSnils@79@wsRemoteOperation").value = parentSnils;
                    document.getElementById("id_childSnils@79@wsRemoteOperation").value = childSnils;
                    document.getElementById("id_withDossier@79@wsRemoteOperation").value = "true";

                    // egisso 1.0.3
                    document.getElementById("data(beginDate@50@wsRemoteOperation)").value = convertDate(twelveMonthsBackFromFour.toLocaleDateString());
                    document.getElementById("data(endDate@50@wsRemoteOperation)").value = convertDate(oneMonthBack.toLocaleDateString());
                    document.getElementById("id_assignmentsInclude@50@wsRemoteOperation").value = "true";
                    document.getElementById("id_onmszCode@50@wsRemoteOperation").value = "173804@sprOsznDep";
                    document.getElementById("id_mszGroup@50@wsRemoteOperation").value = "1@diSmev3EGISSObySnilsMSZgroup";

                    // egisso 1.0.5
                    document.getElementById("id_onmszCode@82@wsRemoteOperation").value = "173804@sprOsznDep";
                    document.getElementById("id_assignmentsInclude@82@wsRemoteOperation").value = "true";
                    document.getElementById("id_mszGroup@82@wsRemoteOperation").value = "1@diSmev3EGISSObySnilsMSZgroup";
                    document.getElementById("id_mszGroupObligations@82@wsRemoteOperation").value = "1@diSmev3EGISSObySnilsMSZgroup";
                    document.getElementById("data(beginDate@82@wsRemoteOperation)").value = convertDate(twelveMonthsBackFromFour.toLocaleDateString());
                    document.getElementById("data(endDate@82@wsRemoteOperation)").value = convertDate(oneMonthBack.toLocaleDateString());
                    break;
                }
                default: {
                    // egisso 1.0.3
                    document.getElementById("data(beginDate@50@wsRemoteOperation)").value = convertDate(twelveMonthsBackFromFour.toLocaleDateString());
                    document.getElementById("data(endDate@50@wsRemoteOperation)").value = convertDate(oneMonthBack.toLocaleDateString());
                    document.getElementById("id_assignmentsInclude@50@wsRemoteOperation").value = "true";
                    document.getElementById("id_onmszCode@50@wsRemoteOperation").value = "173804@sprOsznDep";
                    document.getElementById("id_mszGroup@50@wsRemoteOperation").value = "1@diSmev3EGISSObySnilsMSZgroup";

                    // egisso 1.0.5
                    document.getElementById("id_onmszCode@82@wsRemoteOperation").value = "173804@sprOsznDep";
                    document.getElementById("id_assignmentsInclude@82@wsRemoteOperation").value = "true";
                    document.getElementById("id_mszGroup@82@wsRemoteOperation").value = "1@diSmev3EGISSObySnilsMSZgroup";
                    document.getElementById("id_mszGroupObligations@82@wsRemoteOperation").value = "1@diSmev3EGISSObySnilsMSZgroup";
                    document.getElementById("data(beginDate@82@wsRemoteOperation)").value = convertDate(twelveMonthsBackFromFour.toLocaleDateString());
                    document.getElementById("data(endDate@82@wsRemoteOperation)").value = convertDate(oneMonthBack.toLocaleDateString());
                }
            }
        }
    }
}