const url = "http://localhost:8443/api/expenses";

const Services = {
    save: function (expenseName: String, proposal: any, costCenter: any, expense: any) {
        return new Promise((resolve, reject) => {

        let costCenters = [];
        let expenses = [];

        for (let i = 0; i < costCenter.length; i++) {
            costCenters.push({ "costCenterCode": costCenter[i] });
        }

        for (let i = 0; i < expense.length; i++) {
            expenses.push({ "expenseCode": expense[i] });
        }

            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    expenseType: expenseName,
                    proposal: { proposalCode: proposal },
                    costCenter: costCenters,
                    expense: { expenseCode: expense }
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
    findByProposal: function (id: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/proposal/" + id, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    }
}

export default Services;