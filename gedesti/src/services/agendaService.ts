const url = "http://localhost:8080/api/pauta";

const Service = {
    save: function (numeroSequencial: Number, anoPauta: Number, comissao: any) {

        let listaComissoes:any = [];

        for(let i = 0; i < comissao.length; i++){
            listaComissoes.push({codigoComissao: comissao[i].codigoComissao})
        }

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    numeroSequencial: numeroSequencial,
                    anoPauta: anoPauta,
                    comissao: listaComissoes
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