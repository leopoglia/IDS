const url = "http://localhost:8080/api/worker";


const Services = {

    // cadastrarCliente: function (nome: String, cnpj: String) {
    //     return new Promise((resolve, reject) => {
    //         fetch(url + '/cliente', { method: 'POST', body: JSON.stringify({ nome: nome, cnpj: cnpj }), headers: { 'Content-Type': 'application/json' } }).then(function (result) { return result.json(); }).then(resolve).catch(resolve)
    //     })
    // },

    save: function (workerCode: Number, workerName: String, corporateEmail: String, workerPassword: String, workerOffice: String) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    workerCode: workerCode,
                    workerName: workerName,
                    corporateEmail: corporateEmail,
                    workerPassword: workerPassword,
                    workerOffice: workerOffice
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
    login: function (corporateEmail: String, workerPassword: String) {
        return new Promise((resolve, reject) => {
            fetch(url + '/login', {
                method: 'POST', body: JSON.stringify({
                    corporateEmail: corporateEmail,
                    workerPassword: workerPassword
                }), headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    }
}

export default Services;