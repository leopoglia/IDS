import othersUtil from "./othersUtil";


const filtersUtil = {

    demand: (nameFilter: any, typeFilter: any, search: any, val: any, customFilterObject: any): any => {

        if (othersUtil.verifyObject(customFilterObject)) {

            let totalFilter = 0;


            for (let i = 0; i < Object.keys(customFilterObject).length; i++) {

                if (val.requesterRegistration.workerName.toUpperCase().includes(customFilterObject?.requester?.toUpperCase()) || customFilterObject.requester === "") {
                    totalFilter++;
                }

                if (val?.approver?.workerName?.toUpperCase().includes(customFilterObject?.manager?.toUpperCase()) || customFilterObject.manager === "") {
                    totalFilter++;
                }

                if (val?.requesterRegistration.department.toUpperCase().includes(customFilterObject?.departament?.toUpperCase()) || customFilterObject.departament === "") {
                    totalFilter++;
                }

                if (val?.classification?.classificationSize.toUpperCase() === customFilterObject?.size?.toUpperCase() || customFilterObject.size === "") {
                    totalFilter++;
                }

                if (val?.classification?.ppmCode.toUpperCase().includes(customFilterObject?.ppmCode?.toUpperCase()) || customFilterObject.ppmCode === "") {
                    totalFilter++;
                }

                if (val?.demandCode === parseInt(customFilterObject.demandCode) || customFilterObject.demandCode === "") {
                    totalFilter++;
                }

                if (val?.demandStatus.toUpperCase().includes(customFilterObject?.status?.toUpperCase()) || customFilterObject.status === "") {
                    totalFilter++;
                }

                console.log(customFilterObject)
                console.log("totalFilter => ", totalFilter , " === customFilterObject.length" , Object.keys(customFilterObject).length); 

                if (totalFilter === Object.keys(customFilterObject).length) {
                    return true;
                } else {
                    return false;
                }

            }
        }





        if (
            (nameFilter === "" || nameFilter === undefined) &&
            (typeFilter === "" || typeFilter === undefined) &&
            search === ""
        ) {
            return true;
        }

        if (val === undefined) return false
        if (nameFilter === undefined) return false


        if (search !== "" && val.demandTitle.toUpperCase().includes(search.toUpperCase())) {
            return true;
        }

        if (typeFilter === "requester" && val.requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
            return true;
        } else if (typeFilter === "manager" && val?.approver?.workerName?.toUpperCase().includes(nameFilter.toUpperCase())) {
            return true;
        } else if (typeFilter === "status" && val?.demandStatus.toUpperCase() === nameFilter.toUpperCase()) {
            return true;
        } else if (typeFilter === "size" && val?.classification?.classificationSize.toUpperCase() === nameFilter.toUpperCase()) {
            return true;
        } else if (typeFilter === "ppm" && val?.classification?.ppmCode.toUpperCase() === nameFilter.toUpperCase()) {
            return true;
        } else if (typeFilter === "code-demand" && val?.demandCode === parseInt(nameFilter)) {
            return true;
        } else if (typeFilter === "home" && val?.requesterRegistration.workerName === nameFilter) {
            return true;
        } else if (typeFilter === "department" && val?.requesterRegistration.department === nameFilter) {
            return true;
        } else if (typeFilter === "forum" && val?.forum?.commissionAcronym === nameFilter) {
            return true;
        } else if (nameFilter === "dates" || nameFilter === "score" || nameFilter === "code") {
            return true;
        }





        return false;
    },

    proposal: (nameFilter: any, typeFilter: any, search: any, val: any, customFilterObject: any): any => {

        if (othersUtil.verifyObject(customFilterObject)) {




        }


        if (
            (nameFilter === "" || nameFilter === undefined) &&
            (typeFilter === "" || typeFilter === undefined) &&
            search === ""
        ) {
            return true;
        }

        if (search !== "" && val.demand?.demandTitle.toUpperCase().includes(search.toUpperCase())) {
            return true;
        }

        if (typeFilter === "requester" && val.demand?.requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
            return true;
        } else if (typeFilter === "size" && val.demand?.classification.classificationSize.toUpperCase() === nameFilter.toUpperCase()) {
            return true;
        } else if (typeFilter === "ppm" && val.demand?.classification.ppmCode.toUpperCase() === nameFilter.toUpperCase()) {
            return true;
        } else if (typeFilter === "manager" && val.demand?.approver?.workerName?.toUpperCase().includes(nameFilter.toUpperCase())) {
            return true;
        } else if (typeFilter === "code-proposal" && val.proposalCode === parseInt(nameFilter)) {
            return true;
        } else if (typeFilter === "department" && val.demand?.requesterRegistration.department === nameFilter) {
            return true;
        } else if (typeFilter === "forum" && val?.forum?.commissionAcronym === nameFilter) {
            return true;
        } else if (nameFilter === "dates" || nameFilter === "score" || nameFilter === "code") {
            return true;
        }

        return false;
    },

    agenda: (nameFilter: any, typeFilter: any, search: any, val: any, customFilterObject: any): any => {

        if (othersUtil.verifyObject(customFilterObject)) {




        }

        if (
            (nameFilter === "" || nameFilter === undefined) &&
            (typeFilter === "" || typeFilter === undefined) &&
            search === ""
        ) {
            return true;
        }

        if (search !== "" && ((val?.commission?.commissionName?.split("–")[1]).toUpperCase() + " – " + val.agendaDate).includes(search)) {
            return true;
        }

        if (typeFilter === "forum" && val?.commission?.commissionAcronym === nameFilter) {
            return true;
        }

        if (typeFilter === "date" && val?.initialDate?.split("T")[0] === nameFilter) {
            return true;
        }

        if (nameFilter === "dates" || nameFilter === "score" || nameFilter === "code") {
            return true;
        }

        if (typeFilter === "code-agendas") {

            for (let i = 0; i < val.proposals.length; i++) {

                if (val.proposals[i].proposalCode === parseInt(nameFilter)) {
                    return true;
                }

            }
        }
        return false;
    },

    minutes: (nameFilter: any, typeFilter: any, search: any, val: any, t: any, customFilterObject: any): any => {

        if (othersUtil.verifyObject(customFilterObject)) {




        }

        if (
            (nameFilter === "" || nameFilter === undefined) &&
            (typeFilter === "" || typeFilter === undefined) &&
            search === ""
        ) {
            return true;
        }

        if (search !== "" && ((t(val.minuteType) + " – " + val.agenda.commission.commissionName.split("–")[1]).toUpperCase()).includes(search.toUpperCase())) {
            return true;
        }

        let dateFormat: any;

        // se for menos de 9 colocar 0 na frente
        if (val.minuteStartDate?.split("/")[1].length === 1) {
            dateFormat = val.minuteStartDate.split("/")[0] + "0" + val.minuteStartDate.split("/")[1] + val.minuteStartDate.split("/")[2]
        }

        if (typeFilter === "code-minutes" && val.minuteCode === parseInt(nameFilter)) {
            return true;
        } else if (typeFilter === "date" && dateFormat.includes(nameFilter.split("-").reverse().join(""))) {
            return true;
        } else if (nameFilter === "dates" || nameFilter === "score" || nameFilter === "code") {
            return true;
        }


        return false;
    }
};

export default filtersUtil;