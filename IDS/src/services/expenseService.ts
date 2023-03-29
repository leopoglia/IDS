const url = "https://localhost:8443/api/expense";

const Services = {
    save: function (expenseType: String, expenseProfile: String, amountOfHours: Number, hourValue: Number, totalValue: Number, costCenter: Number, proposal: Number) {

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    expenseType: expenseType,
                    expenseProfile: expenseProfile,
                    runTime: 0,
                    amountOfHours: amountOfHours,
                    hourValue: hourValue,
                    totalValue: totalValue,
                    proposal: { proposalCode: proposal },
                    costCenter: { costCenterCode: costCenter }
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
    }
}

export default Services;