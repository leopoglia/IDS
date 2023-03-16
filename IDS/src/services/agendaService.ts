const url = "https://localhost:8443/api/agenda";

const Services = {
    save: function (sequentialNumber: Number, yearAgenda: Number, commission: any, agendaDate: String, proposals: any) {

        let proposalList: any = [];
        for (let i = 0; i < proposals.length; i++) {
            proposalList.push({ proposalCode: proposals[i].proposalCode })
        }

        console.log("PROPOSAL LIST ---> ", proposalList);

        let comissionList: any = [];
        for (let i = 0; i < commission.length; i++) {
            comissionList.push({ comissionCode: commission[i] })
        }

        console.log("COMISSION LIST ---> ", comissionList);


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
    },
    findByPage: function(page: Number, size: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/page?page=" + page + "&size=" + size, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    }
}

export default Services;