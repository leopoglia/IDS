const url = "http://localhost:8443/api/historical";

const Services = {
    save: function (demand: Number, historicalAttachment: any) {
        return new Promise((resolve, reject) => {

            var formData = new FormData();
            let historical = {"demand": {demandCode: demand}}
            formData.append("historical", JSON.stringify(historical));
            formData.append("historicalAttachment", historicalAttachment);

            fetch(url, {
                method: 'POST', 
                body: formData,
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
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
    delete: function (id: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'DELETE', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    }
}

export default Services;