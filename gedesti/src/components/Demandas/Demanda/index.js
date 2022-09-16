import "./style.css";

export default function Demanda() {
    return (
        <div className="demanda">

            <section>
                <h1>Nome da Solicitação</h1>

                <div className="graphic">
                    <div className="situation"></div>
                </div>
            </section>

            <div className="infos">
                <div>Solicitante: Nome do Solicitante</div>
                <div>Data da solicitação: 27/04/2022</div>
                <div>Situação: Backlog</div>

            </div>
        </div>
    );
}