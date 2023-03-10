const url = "http://localhost:8080/api/agenda";

const Services = {
    save: function (sequentialNumber: Number, yearAgenda: Number, commission: any, agendaDate: String, proposals: any) {

        let proposalList: any = [];
        for(let i = 0; i < proposals.length; i++){
            proposalList.push({ proposalCode: proposals[i] })
        }


        let comissionList: any = [];

        for (let i = 0; i < commission.length; i++) {
            comissionList.push({ workerCode: commission[i] })
        }

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    sequentialNumber: sequentialNumber,
                    yearAgenda: yearAgenda,
                    commission: comissionList,
                    agendaDate: agendaDate,
                    proposals: proposalList
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