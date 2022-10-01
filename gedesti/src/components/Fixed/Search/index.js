import "./style.css";
import ButtonTableList from "./ButtonSearch";
import Title from "./Title";

export default function Search(props) {
    return (
        <div className="search">
            <Title nav={props.nav} title={props.title} />

            <div className="section">

                <div className="input-search">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Buscar por solicitação" required />
                </div>

                <button className="criar-demanda">
                    <span className="material-symbols-outlined">
                        add
                    </span>
                    Criar demanda
                </button>

                <div className="btn-search">
                    <ButtonTableList icon="table_rows" />

                    <ButtonTableList icon="filter_alt" />
                </div>
            </div>
        </div>
    );
}