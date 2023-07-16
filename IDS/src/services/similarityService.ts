const url = "http://localhost:8443/api/similarity";


const Services = {

    compare: function (demandCode: any) {
        return new Promise((resolve, reject) => {
            fetch(url + "/compare/" + demandCode, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    }

}

export default Services;