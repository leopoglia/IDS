import "./style.css"


export default function Notification() {
    return (
        <div className="notification">
            <div className="informations">
                <span class="material-symbols-outlined">
                    info
                </span>
                <span>Sua solicitação está sendo analisada</span>
            </div>

            <div className="date-horary">
                <span className="date">11/05/2022</span>
                <span className="horary">19:30</span>

            </div>
        </div>
    );
}