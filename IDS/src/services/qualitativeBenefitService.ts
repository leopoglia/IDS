const url = "http://localhost:8443/api/qualitativebenefit"

const Services = {
    save: function (frequencyOfUse: String, qualitativeBenefitDescription:String, interalControlsRequirements: Boolean) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    frequencyOfUse: frequencyOfUse,
                    qualitativeBenefitDescription: qualitativeBenefitDescription,
                    interalControlsRequirements: interalControlsRequirements
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
    update: function (qualitativeBenefitCode: Number, qualitativeBenefitDescription:String, interalControlsRequirements: Boolean, frequencyOfUse: String,) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + qualitativeBenefitCode, {
                method: 'PUT', body: JSON.stringify({
                    qualitativeBenefitCode: qualitativeBenefitCode,
                    frequencyOfUse: frequencyOfUse,
                    qualitativeBenefitDescription: qualitativeBenefitDescription,
                    interalControlsRequirements: interalControlsRequirements
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    }
}

export default Services;