import "./style.css";
import ButtonTableList from "./ButtonSearch";
import Title from "./Title";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DemandService from "../../../services/demandService";
import { useNavigate } from "react-router-dom";

export interface FilterProps {
    onClick: (name: string | undefined, type: string) => void
}

export default function Search(props: any) {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const url = window.location.href.split("/");

    const [data, setData] = useState(false); // Estado da tabela (demanda, proposta, agenda, minuta)
    const [filter, setFilter] = useState(false); // Estado do filtro

    useEffect(() => {
    }, [props.name, props.type])


    function excel() {
        DemandService.saveExcel(props.name, props.type)
    }

    // Se a tabela estiver aberta, fecha, se estiver fechada, abre
    const sendData = () => {

        console.log("URL --> " ,url[4])

        if (url[4] !== "1") {
            navigate("/" + url[3] + "/1");
        } else {
            navigate("/" + url[3] + "/2");
        }

        const newData = !data;
        setData(newData);
        props.setTable(newData);
    }

    // Se o filtro estiver aberto, fecha, se estiver fechado, abre
    const sendFilter = () => {
        const newFilter = !filter;
        setFilter(newFilter);

        if (props.setFilter) {
            props.setFilter(newFilter);
        }
    }

    // Verifica qual o título da página e retorna o placeholder do input de pesquisa
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

    // Função que recebe os dados do filtro
    const callback = (name: string | undefined, type: string) => {
        setName(name)
        setType(type)
    }

    // Função que envia os dados do filtro para o componente pai
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

                        <button onClick={excel} className="btn-secondary export-spreadsheet">
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
                        <button className="btn-primary btn-create-demand">
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

