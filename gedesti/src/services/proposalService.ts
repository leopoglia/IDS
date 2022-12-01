const url = "http://localhost:8080/api/proposta"

const Service = {
    save: function (nomeProposta: String, statusProposta: String, payback: Number, periodoExecucaoInicial: any, periodoExecucaoFinal: any, descritivoProposta: String, analistaResponsavel: any, codigoPauta: any, Funcionarios: any) {

        let listaFuncionarios:any = [];



        for(let i = 0; i < Funcionarios.length; i++){
            listaFuncionarios.push({codigoComissao: Funcionarios[i].codigoComissao})
        }

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    nomeProposta: nomeProposta,
                    statusProposta: statusProposta,
                    payback: payback,
                    periodoExecucaoInicial: periodoExecucaoInicial,
                    periodoExecucaoFinal: periodoExecucaoFinal,
                    descritivoProposta: descritivoProposta,
                    analistaResponsavel: {codigoFuncionario: analistaResponsavel},
                    codigoPauta: {codigoPauta: codigoPauta},
                    Funcionarios: listaFuncionarios
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