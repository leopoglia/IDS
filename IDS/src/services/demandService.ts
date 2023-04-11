const url = "http://localhost:8443/api/demand";

const Services = {
    save: function (demandTitle: String, currentProblem: String, demandObjective: String, costCenter: any, demandStatus: String, score: Number, executionPeriod: Number, requesterRegistration: Number, realBenefit: Number, potentialBenefit: Number, qualitativeBenefit: Number, demandAttachment: any, demandDate: String) {
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
            "executionPeriod": executionPeriod,
            "requesterRegistration": { "workerCode": requesterRegistration },
            "realBenefit": { "realBenefitCode": realBenefit },
            "qualitativeBenefit": { "qualitativeBenefitCode": qualitativeBenefit },
            "potentialBenefit": { "potentialBenefitCode": potentialBenefit },
            "demandDate": demandDate
        }

        formData.append('demand', JSON.stringify(demand));
        formData.append('demandAttachment', demandAttachment);


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
        realBenefit: Number, potentialBenefit: Number, qualitativeBenefit: Number, demandAttachment: any, demandDate: String, demandStatus: any,
        demandScore: any, demandRequester: any, classificationCode: any) {
        var formData = new FormData();


        let costCenters = [];
        for (let i = 0; i < costCenter.length; i++) {
            costCenters.push({ "costCenterCode": costCenter[i] });
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
                "executionPeriod": executionPeriod,
                "requesterRegistration": { "workerCode": demandRequester },
                "realBenefit": { "realBenefitCode": realBenefit },
                "qualitativeBenefit": { "qualitativeBenefitCode": qualitativeBenefit },
                "potentialBenefit": { "potentialBenefitCode": potentialBenefit },
                "demandDate": demandDate,
                "demandStatus": demandStatus
            }
        } else {
            demand = {
                "demandTitle": demandTitle.toUpperCase(),
                "currentProblem": currentProblem,
                "demandObjective": demandObjective,
                "costCenter": costCenters,
                "executionPeriod": executionPeriod,
                "requesterRegistration": { "workerCode": demandRequester },
                "realBenefit": { "realBenefitCode": realBenefit },
                "qualitativeBenefit": { "qualitativeBenefitCode": qualitativeBenefit },
                "potentialBenefit": { "potentialBenefitCode": potentialBenefit },
                "demandDate": demandDate,
                "demandStatus": demandStatus,
                "classification": { "classificationCode": classificationCode }
            }
        }

        formData.append('demand', JSON.stringify(demand));
        if (demandAttachment !== null) {
            formData.append('demandAttachment', demandAttachment);
        }


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
            console.log("value: " + value + " type: " + type)
            fetch(url + "/filter/" + value + "/" + type, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    }
}

export default Services;