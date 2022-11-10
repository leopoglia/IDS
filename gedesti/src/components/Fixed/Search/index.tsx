import "./style.css";
import ButtonTableList from "./ButtonSearch";
import Title from "./Title";
import { Link } from "react-router-dom";

export default function Search(props: {
    nav: string;
    title: string;
    button?: string;
    link?: any;
}) {
    return (
        <div className="search">
            <Title nav={props.nav} title={props.title} />

            <div className="section">

                <div className="input-search">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Buscar por solicitação" required />
                </div>


                <div className="display-flex">
                    <Link to={props.link}>
                        <button className="btn-primary">
                            <span className="material-symbols-outlined">
                                add
                            </span>
                            {props.button}
                        </button>
                    </Link>

                    <div className="btn-search">
                        <ButtonTableList icon="table_rows" />

                        <ButtonTableList icon="filter_alt" />
                    </div>
                </div>
            </div>
        </div>
    );
}