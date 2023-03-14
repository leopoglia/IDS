const url = "http://localhost:8080/api/realbenefit"

const Services = {

    save: function (realMonthlyValue: Number, realBenefitDescription: String, realCurrency: String) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    realMonthlyValue: realMonthlyValue,
                    realBenefitDescription: realBenefitDescription,
                    realCurrency: realCurrency
                }), headers: { 'Content-Type': 'application/json' }
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
    },
    update: function (realBenefitCode: Number, realMonthlyValue: Number, realBenefitDescription: String, realCurrency: String) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + realBenefitCode, {
                method: 'PUT', body: JSON.stringify({
                    realBenefitCode: realBenefitCode,
                    realMonthlyValue: realMonthlyValue,
                    realBenefitDescription: realBenefitDescription,
                    realCurrency: realCurrency
                }), headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    }

}

export default Services;