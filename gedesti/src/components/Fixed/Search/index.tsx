import "./style.css";
import ButtonTableList from "./ButtonSearch";
import Title from "./Title";
import { Link } from "react-router-dom";

export default function Search(props: {
    nav: string;
    title: string;
}) {
    return (
        <div className="search">
            <Title nav={props.nav} title={props.title} />

            <div className="section">

                <div className="input-search">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Buscar por solicitação" required />
                </div>

                <Link to="/create-demand/1">
                    <button className="criar-demanda">
                        <span className="material-symbols-outlined">
                            add
                        </span>
                        Criar demanda
                    </button>
                </Link>

                <div className="btn-search">
                    <ButtonTableList icon="table_rows" />

                    <ButtonTableList icon="filter_alt" />
                </div>
            </div>
        </div>
    );
}