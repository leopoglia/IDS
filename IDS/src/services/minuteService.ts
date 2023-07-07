const url = "http://localhost:8443/api/minutes";

const Services = {

    save: function (minuteName: String, agenda: any, minuteStartDate: any, director: any, minuteType: String) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    minuteName: minuteName,
                    agenda: {agendaCode: agenda},
                    minuteStartDate: minuteStartDate,
                    minuteEndDate: null,
                    director: {workerCode: director},
                    minuteType: minuteType
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    },
    findByPage: function (page: Number, size: Number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/page?page=" + page + "&size=" + size, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { 
                return result.json(); 
            })
                .then(resolve)
                .catch(reject)
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
    findByMinuteType: function (minuteType: String) {
        return new Promise((resolve, reject) => {
            fetch(url + "/type/" + minuteType, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },
    findByAgenda: function (agenda: any) {
        return new Promise((resolve, reject) => {
            fetch(url + "/agenda/" + agenda, {
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
    saveExcel: function (minutes: any) {
        return new Promise((resolve, reject) => {
            fetch(url + "/filter", {
                method: 'POST',
                body: JSON.stringify(minutes),
                headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result; })
                .then(resolve)
                .catch(reject)
        })
    },
    order: function(name: String, type: String) {
        return new Promise((resolve, reject) => {
            fetch(url + "/order/" + name + "/" + type, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    }
}

export default Services;