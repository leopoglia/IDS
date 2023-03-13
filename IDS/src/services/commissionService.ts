const url = "http://localhost:8080/api/commission";

const Services = {
    save: function (commissionName: String, commissionAcronym: String) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    commissionName: commissionName,
                    commissionAcronym: commissionAcronym
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
}

export default Services;