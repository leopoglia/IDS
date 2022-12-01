const url = "http://localhost:8080/api/classificacao"

const Service = {
    save: function (tamanhoClassificacao: Number, secaoTI: String, codigoPPM: String, linkEpicJira: String, buSolicitante: any, busBeneficiadas: any, matriculaAnalista: any) {

        let listaBusBeneficiadas: any = [];

        for (let i = 0; i < busBeneficiadas.length; i++) {
            listaBusBeneficiadas.push({ codigoBu: busBeneficiadas[i].codigoBu })
        }

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    tamanhoClassificacao: tamanhoClassificacao,
                    secaoTI: secaoTI,
                    codigoPPM: codigoPPM,
                    linkEpicJira: linkEpicJira,
                    matriculaAnalista: { codigoFuncionario: matriculaAnalista },
                    buSolicitante: { codigoBu: buSolicitante },
                    busBeneficiadas: listaBusBeneficiadas
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