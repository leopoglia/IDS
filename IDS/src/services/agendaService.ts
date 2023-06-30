const url = "http://localhost:8443/api/agenda";

const Services = {
    save: function (sequentialNumber: number, dateInitial: String, dateFinal: any, commission: any, agendaDate: String, proposals: any, analistRegistry: any) {


        let proposalList: any = [];
        for (let i = 0; i < proposals.length; i++) {
            proposalList.push({ proposalCode: proposals[i].proposalCode })
        }

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    sequentialNumber: sequentialNumber,
                    initialDate: dateInitial,
                    finalDate: dateFinal,
                    commission: { "commissionCode": commission },
                    agendaDate: agendaDate,
                    proposals: proposalList,
                    analistRegistry: { "workerCode": analistRegistry }
                }),
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
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
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    delete: function (id: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'DELETE', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    findByPage: function (page: Number, size: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/page?page=" + page + "&size=" + size, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    findByProposals: function (proposal: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/proposal/" + proposal, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    update: function (sequentialNumber: number, dateInitial: String, dateFinal: any, commission: any, agendaDate: String, proposals: any, analistRegistry: any, id: number) {
        let proposalList: any = [];
        for (let i = 0; i < proposals.length; i++) {
            proposalList.push({ proposalCode: proposals[i].proposalCode })
        }

        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'PUT', body: JSON.stringify({
                    sequentialNumber: sequentialNumber,
                    initialDate: dateInitial,
                    finalDate: dateFinal,
                    commission: { "commissionCode": commission },
                    agendaDate: agendaDate,
                    proposals: proposalList,
                    analistRegistry: { "workerCode": analistRegistry }
                }),
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    saveExcel: function (agendas: any) {
        return new Promise((resolve, reject) => {
            fetch(url + "/filter", {
                method: 'POST',
                body: JSON.stringify(agendas),
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result; })
                .then(resolve)
                .catch(reject)
        })
    },
}

export default Services;