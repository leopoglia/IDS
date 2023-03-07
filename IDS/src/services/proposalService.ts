const url = "http://localhost:8080/api/proposal"

const Services = {
    save: function (proposalName: String, proposalStatus: String, payback: Number, initialRunPeriod: any, finalExecutionPeriod: any, descriptiveProposal: String, responsibleAnalyst: any, agendaCode: any, workers: any, totalsCosts: Number, externalCosts: Number, internalCosts: Number, demandCode: any, proposalDate: String) {

        let workersList: any = [];

        for (let i = 0; i < workers.length; i++) {
            workersList.push({ comissionCode: workers[i].comissionCode })
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
                    demand: { demandCode: demandCode },
                    proposalDate: proposalDate
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
    findByDemand: function (demandCode: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/demand/" + demandCode, {
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
    updateAgenda: function(id: Number, agenda: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/agenda/" + id, {
                method: 'PUT',
                body: JSON.stringify({ "agenda": { "agendaCode": id } }),
                headers: { 'Content-Type': 'application/json' }}).then(function (result) { return result.json(); }).then(resolve).catch(reject) 
        })
    },
    addOpinion: function(id: Number, status: String, comissionOpinion: String) {
        return new Promise((resolve, reject) => {
            fetch(url + "/status/" + id, {
                method: 'PUT',
                body: JSON.stringify({ "proposalStatus": status,
                                       "commissionOpinion": comissionOpinion }),
                headers: { 'Content-Type': 'application/json' }}).then(function (result) { return result.json(); }).then(resolve).catch(reject) 
        })
    }
}

export default Services;