import ServicesCostCenter from "./costCenterService";
const url = "http://localhost:8443/api/expenses";

const Services = {
    save: function (expenseName: String, proposal: any, expense: any, expensesCostCenters: any) {



        return new Promise((resolve, reject) => {
            let expenses = [];
            let expensesCostCentersNew = [];

            for (let i = 0; i < expense.length; i++) {
                if (expense[i].expenseType === expenseName) {
                    let hourValue = Number.parseFloat(expense[i].hourValue);
                    expense[i].hourValue = hourValue;

                    expenses.push(expense[i]);
                }
            }

            console.log(expenses)

            for (let i = 0; i < expensesCostCenters.length; i++) {
                expensesCostCentersNew.push({ "costCenter": { "costCenterCode": expensesCostCenters[i].costCenterCode }, "percent": expensesCostCenters[i].percent })
            }

            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    expensesType: expenseName,
                    proposal: { proposalCode: proposal },
                    expense: expenses,
                    expensesCostCenters: expensesCostCentersNew
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    update: function (expenseName: String, proposal: any, costCenter: any, expense: any, expensesCostCenters: any, expensesCode: any) {
        return new Promise(async (resolve, reject) => {

            let costCenterLocalStorage = JSON.parse(localStorage.getItem("centerOfCustProposalrecurrent") || "[]");

            let expenses = [];
            let expensesCostCentersNew = [];

            for (let i = 0; i < expense.length; i++) {
                if (expense[i].expenseType === expenseName) {
                    expenses.push(expense[i]);
                }
            }

            for (let i = 0; i < costCenterLocalStorage.length; i++) {
                expensesCostCentersNew.push({ "costCenter": { "costCenterCode": parseInt(costCenterLocalStorage[i].costCenterCode) }, "percent": costCenterLocalStorage[i].percent })
            }

            fetch(url + "/" + expensesCode, {
                method: 'PUT', body: JSON.stringify({
                    expensesType: expenseName,
                    proposal: { proposalCode: proposal },
                    expense: expenses,
                    expensesCostCenters: expensesCostCentersNew
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