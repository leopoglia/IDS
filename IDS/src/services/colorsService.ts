const url = "http://localhost:8443/api/colors";

const Services = {

    update: function (colorsCode: Number, colors: any) {
        return new Promise((resolve, reject) => {
            fetch(url + "/" + colorsCode, {
                method: 'PUT', body: JSON.stringify({
                    color1: colors.color1,
                    color2: colors.color2,
                    color3: colors.color3,
                    color4: colors.color4,
                    color5: colors.color5,
                    color6: colors.color6,
                    color7: colors.color7,
                    color8: colors.color8,
                    color9: colors.color9
                }), headers: { 'Content-Type': 'application/json' }, credentials: 'include'
            }).then(function (result) { return result.json(); })
                .then(resolve)
                .catch(resolve)
        })
    }

}

export default Services;