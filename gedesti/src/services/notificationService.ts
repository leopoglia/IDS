const url = "http://localhost:8080/api/notification";

const Services = {

    save: function (description: string, workerCode: number, icon: string) {
        return new Promise((resolve, reject) => {

            const date = new Date();
            
            const notification = {
                date: date,
                description: description,
                worker: {workerCode: workerCode},
                icon: icon
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

}

export default Services;