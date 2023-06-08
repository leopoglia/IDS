const url = "http://localhost:8443/api/demand";

const Services = {
    save: function (demandTitle: String, currentProblem: String, demandObjective: String, costCenter: any, demandStatus: String, score: any, executionPeriod: Number, requesterRegistration: Number, realBenefit: Number, potentialBenefit: Number, qualitativeBenefit: Number, demandAttachments: any[]) {
        var formData = new FormData();

        let costCenters = [];
        for (let i = 0; i < costCenter.length; i++) {
            costCenters.push({ "costCenterCode": costCenter[i] });
        }

        let demand = {
            "demandTitle": demandTitle.toUpperCase(),
            "currentProblem": currentProblem,
            "demandObjective": demandObjective,
            "costCenter": costCenters,
            "demandStatus": demandStatus,
            "score": score,
            "requesterRegistration": { "workerCode": requesterRegistration },
            "realBenefit": { "realBenefitCode": realBenefit },
            "qualitativeBenefit": { "qualitativeBenefitCode": qualitativeBenefit },
            "potentialBenefit": { "potentialBenefitCode": potentialBenefit }
        }

        formData.append('demand', JSON.stringify(demand));
        demandAttachments.forEach(demandAttachment => formData.append('demandAttachments', demandAttachment))

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    historical: function (demandCode: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/historical/" + demandCode, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    findAll: async function () {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    findById: function (id: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    delete: function (id: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'DELETE', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    update: function (id: number, demandTitle: String, currentProblem: String, demandObjective: String, costCenter: any, executionPeriod: Number,
        realBenefit: Number, potentialBenefit: Number, qualitativeBenefit: Number, demandAttachments: any[], demandDate: String, demandStatus: any,
        demandScore: any, demandRequester: any, classificationCode: any, approver: any) {
        var formData = new FormData();

        let costCenters = [];
        for (let i = 0; i < costCenter.length; i++) {
            if (costCenter[i].costCenterCode !== undefined) {
                costCenters.push({ "costCenterCode": costCenter[i].costCenterCode });
            } else {
                costCenters.push({ "costCenterCode": costCenter[i] });
            }
        }

        let demand = {}
        if (classificationCode === null ||
            classificationCode === undefined ||
            classificationCode === "") {
            demand = {
                "demandTitle": demandTitle.toUpperCase(),
                "currentProblem": currentProblem,
                "demandObjective": demandObjective,
                "costCenter": costCenters,
                "requesterRegistration": { "workerCode": demandRequester },
                "realBenefit": { "realBenefitCode": realBenefit },
                "qualitativeBenefit": { "qualitativeBenefitCode": qualitativeBenefit },
                "potentialBenefit": { "potentialBenefitCode": potentialBenefit },
                "demandStatus": demandStatus,
                "score": demandScore
            }
        } else {
            demand = {
                "demandTitle": demandTitle.toUpperCase(),
                "currentProblem": currentProblem,
                "demandObjective": demandObjective,
                "costCenter": costCenters,
                "requesterRegistration": { "workerCode": demandRequester },
                "realBenefit": { "realBenefitCode": realBenefit },
                "qualitativeBenefit": { "qualitativeBenefitCode": qualitativeBenefit },
                "potentialBenefit": { "potentialBenefitCode": potentialBenefit },
                "demandStatus": demandStatus,
                "classification": { "classificationCode": classificationCode },
                "score": demandScore,
                "approver": { "workerCode": approver }
            }
        }

        formData.append('demand', JSON.stringify(demand));
        demandAttachments.forEach(demandAttachment => formData.append('demandAttachment', demandAttachment))



        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'PUT',
                body: formData,
                credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    updateClassification: function (id: Number, classificationCode: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/updateclassification/" + id, {
                method: 'PUT',
                body: JSON.stringify({ "classification": { "classificationCode": classificationCode } }),
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); }).then(resolve).catch(reject)
        })
    },
    updateStatus: function (id: Number, demandStatus: String) {
        return new Promise((resolve, reject) => {
            fetch(url + "/updatestatus/" + id, {
                method: 'PUT',
                body: JSON.stringify({ "demandStatus": demandStatus }),
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); }).then(resolve).catch(reject)
        })
    },
    findByPage: function (page: Number, size: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/page?page=" + page + "&size=" + size, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    saveExcel: function (type: any, value: any) {
        return new Promise((resolve, reject) => {

            fetch(url + "/filter/" + value + "/" + type, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    savePDF: function (demandCode: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/pdf/" + demandCode, {
                method: 'GET',
                headers: { 'Content-Type': 'application/pdf' },
                credentials: 'include'
            }).then(function (result) { return result; })
                .then(resolve)
                .catch(reject)
        })
    },
    approve: function (id: Number, workerId: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/approve/" + id + "/" + workerId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); }).then(resolve).catch(reject)
        })
    },
    updateCostCenter: function (id: Number, costCenter: any) {
        let costCenters: any = [];
        for (let i = 0; i < costCenter.length; i++) {
            costCenters.push({ "costCenterCode": costCenter[i] });
        }


        return new Promise((resolve, reject) => {
            fetch(url + "/costcenter/" + id, {
                method: 'PUT',
                body: JSON.stringify({
                    "costCenter": costCenters
                }),
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); }).then(resolve).catch(reject)
        })
    },
    findByDemandCodeAndDemandVersion: function (demandCode: Number, demandVersion: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/demand/" + demandCode + "/" + demandVersion, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    setActiveVersion: function (id: Number, nextDemandVersion: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/setactive/" + id + "/" + nextDemandVersion, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); }).then(resolve).catch(reject)
        })
    }
}

export default Services;