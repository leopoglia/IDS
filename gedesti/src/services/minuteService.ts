const url = "http://localhost:8080/api/minute";

const Services = {

    save: function (minuteName: String, minuteProblem: String, attachment: any, agenda: Number) {
        return new Promise((resolve, reject) => {
            
            var formData = new FormData();
            let minute = {"minuteName": minuteName, "minuteProblem": minuteProblem, "agenda": { agendaCode: agenda }}
            formData.append('minute', JSON.stringify(minute));
            formData.append('attachment', attachment);
            
            fetch(url, {
                method: 'POST', 
                body: formData,
                headers: { 'Content-Type': 'application/json' }
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