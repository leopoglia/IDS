import "./style.css";
import ButtonTableList from "./ButtonSearch";
import Title from "./Title";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface FilterProps {
    onClick: (name: string | undefined, type: string) => void
}

export default function Search(props: any) {

    const { t } = useTranslation();


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

    const [name, setName] = useState<string | undefined>("")
    const [type, setType] = useState<string>("")
    
    const callback = (name: string | undefined, type: string) => {
        setName(name)
        setType(type)
    }

    const onButtonPress = () => {
        props.onClick(name, type)
    }


    return (
        <div className="search">
            <Title nav={props.title} title={props.title} />



            <div className="section">

                {props.name !== "" && props.type !== "" &&
                    <div className="display-flex filter-export">
                        <div className="filters-on" onClick={() => { callback("", ""); props.onClick("", "") }}>
                            <div className="display-flex"><span>{props.name} - {props.type}</span><span className="material-symbols-outlined size-20">close</span></div>
                        </div>

                        <button className="btn-secondary export-spreadsheet">
                            <img src="/attachment/excel.png" alt="" />
                        </button>
                    </div>
                }

                <div className="input-search">

                    <span className="material-symbols-outlined">search</span>
                    <input onChange={(e) => { props.setSearch(e.target.value) }} type="text" placeholder={search()} required />
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
                    </div>

                    <div className="background-filter" onClick={onButtonPress}>
                        {filter && <Filter onClick={callback} />}
                    </div>
                </div>


            </div>

        </div>
    );
}

