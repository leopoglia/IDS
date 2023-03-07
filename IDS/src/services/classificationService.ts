
const url = "http://localhost:8080/api/classification"

const Services = {
    save: function (classificationSize: Number, itSection: String, ppmcode: Number, linkEpicJira: String, requesterBu: any, beneficiaryBu: any, analistRegistry: any) {

        let beneficiaryBuList: any = [];
        for (let i = 0; i < beneficiaryBu.length; i++) {
            beneficiaryBuList.push({ buCode: beneficiaryBu[i] })
        }


        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST', body: JSON.stringify({
                    classificationSize: classificationSize,
                    itSection: itSection,
                    ppmcode: ppmcode,
                    linkEpicJira: linkEpicJira,
                    analistRegistry: { workerCode: analistRegistry },
                    requesterBu: { buCode: requesterBu },
                    beneficiaryBu: beneficiaryBuList,
                    deadline: ""
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
    },
    update: function (id: number, classificationSize: Number, itSection: String, ppmcode: String, linkEpicJira: String, requesterBu: any, beneficiaryBu: any, analistRegistry: any, deadline: any) {

        let beneficiaryBuList: any = [];
        for (let i = 0; i < beneficiaryBu.length; i++) {
            beneficiaryBuList.push({ buCode: beneficiaryBu[i].buCode })
        }

        return new Promise((resolve, reject) => {
            fetch(url + "/" + id, {
                method: 'POST', body: JSON.stringify({
                    classificationSize: classificationSize,
                    itSection: itSection,
                    ppmCode: ppmcode,
                    epicJiraLink: linkEpicJira,
                    analistRegistry: { workerCode: analistRegistry },
                    requesterBu: { buCode: requesterBu },
                    beneficiaryBu: beneficiaryBuList,
                    deadline: deadline
                }), headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    },

    updateComplement: function (id: number, ppmcode: String, linkEpicJira: String) {

        return new Promise((resolve, reject) => {
            fetch(url + "/update/" + id, {
                method: 'PUT', body: JSON.stringify({
                    ppmCode: ppmcode,
                    epicJiraLink: linkEpicJira
                }), headers: { 'Content-Type': 'application/json' }
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    }
}

export default Services;