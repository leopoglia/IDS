const url = "http://localhost:8443/api/historical";

const Services = {
   excel: function(demands: any){
        return new Promise((resolve, reject) => {
        fetch(url + "/excel", {
            method: 'POST',
            body: JSON.stringify(demands),
            headers: { 'Content-Type': 'application/json' }, credentials: 'include'
        }).then(function (result) { return result.json(); })
            .then(resolve)
            .catch(resolve)
    })
   }
}

export default Services;