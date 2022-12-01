import "./style.css";
import ButtonTableList from "./ButtonSearch";
import Title from "./Title";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { SetStateAction, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Search(props: any) {

    const { t, i18n } = useTranslation();


    const [data, setData] = useState(false);
    const [filter, setFilter] = useState(false);


    const sendData = () => {
        if (data === true) {
            setData(false)
        } else {
            setData(true)
        }
        props.setTable(data);
    }

    const sendFilter = () => {
        if (filter === true) {
            setFilter(false)
        } else {
            setFilter(true)
        }
        props.setFilter(filter);
    }

    const search = () => {
        if (props.title === "demands") {
            return t("searchSoliciation");
        } else if (props.title === "proposals") {
            return t("searchProposal");
        } else if (props.title === "agendas") {
            return t("searchAgenda");
        } else if (props.title === "minutes") {
            return t("searchMinute");
        }
    }




    return (
        <div className="search">
            <Title nav={props.title} title={props.title} />

            <div className="section">

                <div className="input-search">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder={search()} required />
                </div>


                <div className="display-flex">
                    <Link to={props.link}>
                        <button className="btn-primary">
                            <span className="material-symbols-outlined">
                                add
                            </span>
                            {t(props.button)}
                        </button>
                    </Link>


                    <div className="btn-search">
                        <ButtonTableList icon="table_rows" sendData={sendData} />

                        <ButtonTableList icon="filter_alt" sendFilter={sendFilter} />

                        {filter && <Filter />}
                    </div>
                </div>
            </div>

        </div>
    );
}

