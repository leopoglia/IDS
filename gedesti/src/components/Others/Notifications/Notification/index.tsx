import "./style.css"


export default function Notification(props: any) {

    function arrumarData() {



        let data = props.date.split("T")
        let dataArrumada = data[0].split("-")
        let dataFinal = dataArrumada[2] + "/" + dataArrumada[1] + "/" + dataArrumada[0]

        if (data[1] != undefined) {
            let horario = data[1].split(":")
            dataFinal = dataFinal + " " + horario[0] + ":" + horario[1]
        }

        if (data[1] == undefined) {
            dataFinal = dataFinal + " " + "00:00"
        }

        if (data[1].split(":") < 10) {
            let horario = data[1].split(":")
            dataFinal = dataFinal + " " + "0" + horario[0] + ":" + horario[1]
        }

        if (data[1].split(":") < 2) {
            let horario = data[1].split(":")
            dataFinal = dataFinal + " " + "0" + horario[0] + ":" + "0" + horario[1]
        }


        return dataFinal
    }



    return (
        <div className="notification">

            <div className="informations">
                <span className="material-symbols-outlined">
                    info
                </span>
                <span>{props.description}</span>
            </div>

            <div className="date-horary">
                <span className="date">{arrumarData()}</span>

            </div>
        </div>
    );
}