const url = "http://localhost:8080/api/proposta"

const Service = {
    save: function (proposalName: String, proposalStatus: String, payback: Number, initialRunPeriod: any, finalExecutionPeriod: any, descriptiveProposal: String, responsibleAnalyst: any, agendaCode: any, workers: any) {

        let workersList:any = [];

        for(let i = 0; i < workers.length; i++){
            workersList.push({comissionCode: workers[i].comissionCode})
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
                    responsibleAnalyst: {codigoFuncionario: responsibleAnalyst},
                    agendaCode: {agendaCode: agendaCode},
                    workers: workersList
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

export default Service;