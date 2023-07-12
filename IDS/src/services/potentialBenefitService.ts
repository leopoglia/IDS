const url = "http://localhost:8443/api/potentialbenefit"

const Services = {
    save: function (potentialMonthlyValue: any, potentialBenefitDescription: String, legalObrigation: Boolean, potentialCurrency: String) {
        return new Promise((resolve, reject) => {

            console.log(potentialMonthlyValue)


            let realMonthlyValueAux: any = 0.0

            if (typeof potentialMonthlyValue === typeof String) {
                if (potentialCurrency === "R$") {
                    realMonthlyValueAux = potentialMonthlyValue.replace("R$", "").replace(".", "").replace(",", ".")
                } else if (potentialCurrency === "$") {
                    realMonthlyValueAux = potentialMonthlyValue.replace("$", "").replace(".", "").replace(",", ".")
                } else if (potentialCurrency === "€") {
                    realMonthlyValueAux = potentialMonthlyValue.replace("€", "").replace(".", "").replace(",", ".")
                }
            }

            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    potentialMonthlyValue: Number.parseFloat(realMonthlyValueAux),
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