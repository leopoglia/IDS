const url = "http://localhost:8443/api/potentialbenefit"

const Services = {
    save: function (potentialMonthlyValue: Number, potentialBenefitDescription: String, legalObrigation: Boolean, potentialCurrency: String) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    potentialMonthlyValue: potentialMonthlyValue,
                    potentialBenefitDescription: potentialBenefitDescription,
                    legalObrigation: legalObrigation == null ? false : legalObrigation,
                    potentialCurrency: potentialCurrency
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    findAll: async function () {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    findById: function (id: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    delete: function (id: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'DELETE', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    update: function (potentialBenefitCode: Number, potentialMonthlyValue: Number, potentialBenefitDescription: String, legalObrigation: true, potentialCurrency: String) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + potentialBenefitCode, {
                method: 'PUT', body: JSON.stringify({
                    potentialBenefitCode: potentialBenefitCode,
                    potentialMonthlyValue: potentialMonthlyValue,
                    potentialBenefitDescription: potentialBenefitDescription,
                    legalObrigation: legalObrigation,
                    potentialCurrency: potentialCurrency
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    }
}

export default Services;