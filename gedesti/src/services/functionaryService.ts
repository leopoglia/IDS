const url = "http://localhost:8080/api/funcionario";


const Services = {

    // cadastrarCliente: function (nome: String, cnpj: String) {
    //     return new Promise((resolve, reject) => {
    //         fetch(url + '/cliente', { method: 'POST', body: JSON.stringify({ nome: nome, cnpj: cnpj }), headers: { 'Content-Type': 'application/json' } }).then(function (result) { return result.json(); }).then(resolve).catch(resolve)
    //     })
    // },

    save: function (codigoFuncionario: Number, nomeFuncionario: String, emailCorporativo: String, senhaFuncionario: String, cargoFuncionario: String) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    codigoFuncionario: codigoFuncionario,
                    nomeFuncionario: nomeFuncionario,
                    emailCorporativo: emailCorporativo,
                    senhaFuncionario: senhaFuncionario,
                    cargoFuncionario: cargoFuncionario
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
