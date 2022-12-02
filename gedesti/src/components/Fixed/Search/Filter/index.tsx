import "./style.css";

export default function Filter() {
    return (
        <div className="filter-modal modal">
            <div className="li">
                <span className="material-symbols-outlined">
                    home
                </span>
                <span>Minhas demandas</span>
            </div>

            <div className="li">
                <span className="material-symbols-outlined">
                    person
                </span>
                <span>Solicitante</span>
            </div>

            <div className="li">
                <span className="material-symbols-outlined">
                    manage_accounts
                </span>
                <span>Gerente</span>
            </div>

            <div className="li">
                <span className="material-symbols-outlined">
                    workspaces
                </span>
                <span>Forúm</span>
            </div>

            <div className="li">
                <span className="material-symbols-outlined">
                    location_on
                </span>
                <span>Departamento</span>
            </div>

            <div className="li">
                <span className="material-symbols-outlined">
                    crop_free
                </span>
                <span>Tamanho</span>
            </div>

            <div className="li">
                <span className="material-symbols-outlined">
                    link
                </span>
                <span>Código PPM</span>
            </div>

            <div className="li">
                <span className="material-symbols-outlined">
                    draft
                </span>
                <span>Código Demanda</span>
            </div>

            <div className="li">
                <span className="material-symbols-outlined">
                    schedule
                </span>
                <span>Status</span>
            </div>

            <div className="hr" />

            <input type="text" />
            <button className="btn-primary">Filtrar</button>
        </div>
    )
}   