const url = "https://localhost:8443/api/notification";

const Services = {

    save: function (description: string, workerCode: number, icon: string, type: string) {
        return new Promise((resolve, reject) => {

            const date = new Date();
            
            const notification = {
                date: date,
                description: description,
                worker: {workerCode: workerCode},
                icon: icon,
                type: type,
            }
    
            fetch(url, {
                method: 'POST', 
                body: JSON.stringify(notification),
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
    // findById: function (id: number) {
    //     return new Promise((resolve, reject) => {
    //         fetch(url + "/" + id, {
    //             method: 'GET', headers: { 'Content-Type': 'application/json' }
    //         }).then(function (result) { return result.json(); })
    //             .then(resolve)
    //             .catch(resolve)
    //     })
    // },
    // delete: function (id: number) {
    //     return new Promise((resolve, reject) => {
    //         fetch(url + "/" + id, {
    //             method: 'DELETE', headers: { 'Content-Type': 'application/json' }
    //         }).then(function (result) { return result.json(); })
    //             .then(resolve)
    //             .catch(resolve)
    //     })
    // }

    updateNotificationVisualized: function (id: number) {
        return new Promise((resolve, reject) => {
            fetch(url + "/update/" + id, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
        
    }

}

export default Services;