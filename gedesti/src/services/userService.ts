


const url = "https://backend-ten-sigma.vercel.app/api";


const Services = {

    cadastrarCliente: function (nome:String, cnpj:String) {
        return new Promise((resolve, reject) => {
            fetch(url + '/cliente', { method: 'POST', body: JSON.stringify({ nome: nome, cnpj: cnpj }), headers: { 'Content-Type': 'application/json' } }).then(function (result) { return result.json(); }).then(resolve).catch(resolve)
        })
    },
}