const url = "http://localhost:8080/api/demand";

const Services = {
    save: function (demandTitle: String, currentProblem: String, demandObjective: String, demandStatus: String, score: Number, executionPeriod: Number, requesterRegistration: Number, realBenefit: Number, QualitativeBenefit: Number, PotentialBenefit: Number, demandAttachment: any) {

        var formData = new FormData();
        let demand = { 
            "demandTitle": demandTitle,
            "currentProblem": currentProblem,
            "demandObjective": demandObjective,
            "demandStatus": demandStatus,
            "score": score,
            "executionPeriod": executionPeriod,
            "requesterRegistration": {"workerCode": requesterRegistration},
            "realBenefit": {"realBenefitCode": realBenefit},
            "QualitativeBenefit": {"QualitativeBenefitCode": QualitativeBenefit},
            "PotentialBenefit": {"PotentialBenefitCode": PotentialBenefit} }
        formData.append("demand", JSON.stringify(demand));
        formData.append("demandAttachment", demandAttachment);

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    findAll: async function () {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    findById: function (id: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    delete: function (id: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'DELETE', headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    }
}

export default Services;