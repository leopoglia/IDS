const url = "http://localhost:8080/api/demand";

const Services = {
    save: function (demandTitle: String, currentProblem: String, demandObjective: String, costCenter: String, demandStatus: String, score: Number, executionPeriod: Number, requesterRegistration: Number, realBenefit: Number, qualitativeBenefit: Number, potentialBenefit: Number, demandAttachment: any, demandDate:String) {
        var formData = new FormData();

        let costCentersSplit = costCenter.split(",");
        let costCenters = [];
        for (let i = 0; i < costCentersSplit.length; i++) {
            costCenters.push({ "costCenterCode": costCentersSplit[i] });
        }

        console.log(costCenters)

        let demand = {
            "demandTitle": demandTitle,
            "currentProblem": currentProblem,
            "demandObjective": demandObjective,
            "costCenter": costCenters,
            "demandStatus": demandStatus,
            "score": score,
            "executionPeriod": executionPeriod,
            "requesterRegistration": { "workerCode": requesterRegistration },
            "realBenefit": { "realBenefitCode": realBenefit },
            "qualitativeBenefit": {"qualitativeBenefitCode": qualitativeBenefit},
            "potentialBenefit": {"potentialBenefitCode": potentialBenefit},
            "demandDate": demandDate
        }
        formData.append('demand', JSON.stringify(demand));
        formData.append('demandAttachment', demandAttachment);

        console.log(formData.get("demand"));

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                body: formData
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    findAll: async function () {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    findById: function (id: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    delete: function (id: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'DELETE', headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    }
}

export default Services;