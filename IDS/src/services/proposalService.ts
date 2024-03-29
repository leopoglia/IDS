const url = "http://localhost:8443/api/proposal"

const Services = {
    save: function (proposalName: String, proposalStatus: String, payback: Number, initialRunPeriod: any, finalExecutionPeriod: any, descriptiveProposal: String, responsibleAnalyst: any, agendaCode: any, workers: any, totalsCosts: Number, externalCosts: Number, internalCosts: Number, demandCode: any, demandVersion: any, proposalDate: String) {

        let workersList: any = [];

        for (let i = 0; i < workers.length; i++) {
            workersList.push({ workerCode: workers[i] })
        }


        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    proposalName: proposalName,
                    proposalStatus: proposalStatus,
                    payback: payback,
                    initialRunPeriod: initialRunPeriod,
                    finalExecutionPeriod: finalExecutionPeriod,
                    descriptiveProposal: descriptiveProposal,
                    responsibleAnalyst: { workerCode: responsibleAnalyst },
                    agendaCode: { agendaCode: agendaCode },
                    workers: workersList,
                    totalCosts: totalsCosts,
                    externalCosts: externalCosts,
                    internalCosts: internalCosts,
                    demand: { demandCode: demandCode, demandVersion: 1 },
                    proposalDate: proposalDate,
                    published: null
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
    update: function (demandCode: number, proposal: any) {
        return new Promise((resolve, reject) => {

            proposal.demand.demandAttachment = undefined;

            fetch(url + "/" + demandCode, {
                method: 'PUT', body: JSON.stringify(proposal), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
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
    updateAgenda: function (id: Number, agenda: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/agenda/" + id, {
                method: 'PUT',
                body: JSON.stringify({ "agenda": { "agendaCode": id } }),
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); }).then(resolve).catch(reject)
        })
    },
    addOpinion: function (id: Number, status: String, comissionOpinion: String, typeMinute: String) {

        if (typeMinute === "dg-opinion") {
            return new Promise((resolve, reject) => {
                fetch(url + "/status/" + id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "proposalStatus": status,
                        "dgOpinion": comissionOpinion
                    }),
                    headers: { 'Content-Type': 'application/json' }, credentials: 'include'
                }).then(function (result) { return result.json(); }).then(resolve).catch(reject)
            })
        } else {
            return new Promise((resolve, reject) => {
                fetch(url + "/status/" + id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "proposalStatus": status,
                        "commissionOpinion": comissionOpinion
                    }),
                    headers: { 'Content-Type': 'application/json' }, credentials: 'include'
                }).then(function (result) { return result.json(); }).then(resolve).catch(reject)
            })
        }
    },
    findByPage: function (page: Number, size: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/page?page=" + page + "&size=" + size, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    updatePublish: function (id: Number, publish: Boolean) {
        return new Promise((resolve, reject) => {
            fetch(url + "/published/" + id, {
                method: 'PUT',
                body: JSON.stringify({ "published": publish }),
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); }).then(resolve).catch(reject)
        })
    },
    findByDemandCode: function (demandCode: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/demand/" + demandCode, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    findByResponsibleAnalyst: function (workerCode: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/analyst/" + workerCode, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    saveExcel: function (proposals: any) {
        return new Promise((resolve, reject) => {
            fetch(url + "/filter", {
                method: 'POST',
                body: JSON.stringify(proposals),
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result; })
                .then(resolve)
                .catch(reject)
        })
    },
    order: function(name: String, type: String) {
        return new Promise((resolve, reject) => {
            fetch(url + "/order/" + name + "/" + type, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
}

export default Services;