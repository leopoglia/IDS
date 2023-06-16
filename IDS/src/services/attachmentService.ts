const url = "http://localhost:8443/api/attachment"

const Services = {
    save: function (file: any) {
        const formData = new FormData();
        formData.append('file', file);
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(reject)
        })
    }
}

export default Services;