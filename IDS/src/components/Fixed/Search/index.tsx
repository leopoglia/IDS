import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonTableList from "./ButtonSearch";
import Title from "./Title";
import Filter from "./Filter";

import "./style.css";
import Input from "../../Solicitation/Demands/CrateDemand/Others/Input";
import othersUtil from "../../../utils/othersUtil";

export interface FilterProps {
    onClick: (name: string | undefined, type: string) => void
}

export default function Search(props: any) {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const url = window.location.href.split("/"); // Pega a url atual e divide em um array

    const [data, setData] = useState(false); // Estado da tabela (demanda, proposta, agenda, minuta)
    const [filter, setFilter] = useState(false); // Estado do filtro
    const [typeFilter, setTypeFilter] = useState(""); // Estado do tipo de filtro (filtro ou ordenar)
    const [name, setName] = useState<string | undefined>("")
    const [type, setType] = useState<string>("")

    useEffect(() => {
        callback(props.name, props.type);
    }, [props.name, props.type])

    useEffect(() => {
        props.setName(name);
        props.setType(type);
    }, [name, type])

    // Se a tabela estiver aberta, fecha, se estiver fechada, abre
    const sendData = () => {
        if (url[4] !== "1") {
            navigate("/" + url[3] + "/1");
        }

        const newData = !data;
        setData(newData);
        props.setTable(newData);
    }

    // Se o filtro estiver aberto, fecha, se estiver fechado, abre
    const sendFilter = (type: string) => {
        const newFilter = !filter;
        setFilter(newFilter);
        setTypeFilter(type);

        if(props?.setFilterOn !== undefined){
            props.setFilterOn(type)
        }
    }

    // Verifica qual o título da página e retorna o placeholder do input de pesquisa
    const search = () => {
        if (props.title === "demands") {
            return t("searchSoliciation");
        } else if (props.title === "proposals" || props.title === "selectProposal") {
            return t("searchProposal");
        } else if (props.title === "agendas") {
            return t("searchAgenda");
        } else if (props.title === "minutes") {
            return t("searchMinute");
        }
    }

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
            <Title nav={props.nav} title={props.title} />



            <div className="section">

                {props.name !== "" && props.type !== "" && props.name !== undefined &&
                    <div className="display-flex filter-export">
                        <div className="filters-on" onClick={() => { callback("", ""); props.onClick("", "") }}>
                            <div className="display-flex"><span>{props.name} - {props.type}</span><span className="material-symbols-outlined size-20">close</span></div>
                        </div>

                        <button onClick={() => othersUtil.excel(props.solicitation, props.solicitationType, props.name, props.type)} className="btn-secondary export-spreadsheet">
                            <img src="/attachment/excel.png" alt="" />
                        </button>
                    </div>
                }

                <Input background={"input-search"} setValue={props.setSearch} value={props.search} icon={"search"} type="text" placeholder={search()} required={true} />


                <div className="display-flex">

                    {props.button !== undefined &&
                        <Link to={props.link}>
                            <button className="btn-primary btn-create-demand mw100">
                                <span className="material-symbols-outlined">
                                    add
                                </span>
                                {t(props.button)}
                            </button>
                        </Link>
                    }

                    <div className="btn-search">
                        {props.setTable !== undefined &&
                            <ButtonTableList icon="table_rows" sendData={sendData} />
                        }

                        {props.name !== undefined &&
                            <>
                                <ButtonTableList icon="swap_vert" sendFilter={() => sendFilter("order")} />

                                <ButtonTableList icon="filter_alt" sendFilter={() => sendFilter("filter")} />
                            </>
                        }

                    </div>

                    <div className="background-filter" onClick={onButtonPress}>
                        {filter && <Filter onClick={callback} type={typeFilter} setName={setName} setType={setType} />}
                    </div>
                </div>
            </div>

        </div>
    );
}

