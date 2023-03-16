const url = "https://localhost:8443/api/reproach";

const Services = {
    save: function(reproachDescription: String, demand: any){
        return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST', body: JSON.stringify({
                demand: {demandCode: demand},
                reproachDescription: reproachDescription
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
    }
}

export default Services;