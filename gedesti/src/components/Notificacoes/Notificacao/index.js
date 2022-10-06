import "./style.css"


export default function Notificacao() {
    return (
        <div className="notificacao">
            <div className="informacoes">
                <span class="material-symbols-outlined">
                    info
                </span>
                <span>Sua solicitação está sendo analisada</span>
            </div>

            <div className="data-horario">
                <span className="data">11/05/2022</span>
                <span className="horario">19:30</span>

            </div>
        </div>
    );
}