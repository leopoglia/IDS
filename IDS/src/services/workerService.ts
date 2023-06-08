const url = "http://localhost:8443/api/worker";


const Services = {

    // cadastrarCliente: function (nome: String, cnpj: String) {
    //     return new Promise((resolve, reject) => {
    //         fetch(url + '/cliente', { method: 'POST', body: JSON.stringify({ nome: nome, cnpj: cnpj }), headers: { 'Content-Type': 'application/json' }, credentials: 'include' }).then(function (result) { return result.json(); }).then(resolve).catch(resolve)
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
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
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
    },
    login: function (corporateEmail: string | undefined, workerPassword: string | undefined) {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8443/login/auth', {
                method: 'POST', body: JSON.stringify({
                    corporateEmail: corporateEmail,
                    workerPassword: workerPassword
                }),
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    updateLanguage: function (id: number, worker: any) {

        return new Promise((resolve, reject) => {
            fetch(url + '/language/' + id, {
                method: 'PUT', body: JSON.stringify({
                    language: worker.language
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    updateVoiceCommand: function (id: number, voiceCommand: any) {

        return new Promise((resolve, reject) => {
            fetch(url + '/voiceCommand/' + id, {
                method: 'PUT', body: JSON.stringify({
                    voiceCommand: voiceCommand
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    updatePounds: function (id: number, pounds: any) {
        return new Promise((resolve, reject) => {
            fetch(url + '/pounds/' + id, {
                method: 'PUT', body: JSON.stringify({
                    pounds: pounds
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    updateScreenReader: function (id: number, screenReader: any) {
        return new Promise((resolve, reject) => {
            fetch(url + '/screenReader/' + id, {
                method: 'PUT', body: JSON.stringify({
                    screenReader: screenReader
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    updateDarkMode: function (id: number, darkmode: any) {
        return new Promise((resolve, reject) => {
            fetch(url + '/darkmode/' + id, {
                method: 'PUT', body: JSON.stringify({
                    darkmode: darkmode
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    updateSquare: function (id: number, square: any) {
        return new Promise((resolve, reject) => {
            fetch(url + '/square/' + id, {
                method: 'PUT', body: JSON.stringify({
                    square: square
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    updateFontSize: function (id: number, fontSize: any) {
        return new Promise((resolve, reject) => {
            fetch(url + '/fontSize/' + id, {
                method: 'PUT', body: JSON.stringify({
                    fontSize: fontSize
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    isUserOnline: function (workerCode: any){
        return new Promise((resolve, reject) => {
            fetch(url + '/user/' + workerCode + "/online", {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    logout: function (){
        return new Promise((resolve, reject) => {
            fetch(url + '/login/logout', {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    }
}

export default Services;
