const url = "http://localhost:8443/api/realbenefit"

const Services = {

    save: function (realMonthlyValue: any, realBenefitDescription: String, realCurrency: String) {
        return new Promise((resolve, reject) => {

  
            let realMonthlyValueAux: any = 0.0

            if (typeof realMonthlyValue === typeof "string") {
                if (realCurrency === "R$") {
                    realMonthlyValueAux = realMonthlyValue.replace("R$", "").replace(".", "").replace(",", ".")
                } else if (realCurrency === "$") {
                    realMonthlyValueAux = realMonthlyValue.replace("$", "").replace(".", "").replace(",", ".")
                } else if (realCurrency === "€") {
                    realMonthlyValueAux = realMonthlyValue.replace("€", "").replace(".", "").replace(",", ".")
                }
            }

            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    realMonthlyValue: Number.parseFloat(realMonthlyValueAux),
                    realBenefitDescription: realBenefitDescription,
                    realCurrency: realCurrency
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
    update: function (realBenefitCode: Number, realMonthlyValue: Number, realBenefitDescription: String, realCurrency: String) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + realBenefitCode, {
                method: 'PUT', body: JSON.stringify({
                    realBenefitCode: realBenefitCode,
                    realMonthlyValue: realMonthlyValue,
                    realBenefitDescription: realBenefitDescription,
                    realCurrency: realCurrency
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    }

}

export default Services;