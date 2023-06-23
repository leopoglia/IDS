import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import ButtonTableList from "./ButtonSearch";
import Title from "./Title";
import Filter from "./Filter";
import DemandService from "../../../services/demandService";
import "./style.css";
import Mic from "../Accessibility/Mic";
import Input from "../../Solicitation/Demands/CrateDemand/Others/Input";

export interface FilterProps {
    onClick: (name: string | undefined, type: string) => void
}

export default function Search(props: any) {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const url = window.location.href.split("/"); // Pega a url atual e divide em um array

    const [data, setData] = useState(false); // Estado da tabela (demanda, proposta, agenda, minuta)
    const [filter, setFilter] = useState(false); // Estado do filtro

    useEffect(() => {
        callback(props.name, props.type);
    }, [props.name, props.type])


    const excel = (demands: any, nameFilter: any, typeFilter: any) => {
        let filteredDemands:any = [];
        for(let i = 0; i < demands.length; i++) {
            console.log("tipo: " + typeFilter + " nome: " + nameFilter)
            if (typeFilter === "requester" && demands[i].requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                filteredDemands.push(demands[i]);
            } else if (typeFilter === "status" && demands[i]?.demandStatus.toUpperCase() === nameFilter.toUpperCase()) {
                console.log("entrou");
                filteredDemands.push(demands[i]);
            } else if (typeFilter === "size" && demands[i]?.classification?.classificationSize.toUpperCase() === nameFilter.toUpperCase()) {
                filteredDemands.push(demands[i]);
            } else if (typeFilter === "ppm" && demands[i]?.classification?.ppmCode.toUpperCase() === nameFilter.toUpperCase()) {
                filteredDemands.push(demands[i]);
            } else if (typeFilter === "code-demand" && demands[i]?.demandCode === parseInt(nameFilter)) {
                filteredDemands.push(demands[i]);
            } else if (typeFilter === "home" && demands[i]?.requesterRegistration.workerName === nameFilter) {
                filteredDemands.push(demands[i]);
            } else if (typeFilter === "department" && demands[i]?.requesterRegistration.department === nameFilter) {
                filteredDemands.push(demands[i]);
            }
        }
        console.log(filteredDemands);
        DemandService.saveExcel(filteredDemands).then((response) => {
            console.log(response);
        })
    }

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
        } else if (props.title === "proposals" || props.title === "selectProposal") {
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
            <Title nav={props.nav} title={props.title} />



            <div className="section">

                {props.name !== "" && props.type !== "" && props.name !== undefined &&
                    <div className="display-flex filter-export">
                        <div className="filters-on" onClick={() => { callback("", ""); props.onClick("", "") }}>
                            <div className="display-flex"><span>{props.name} - {props.type}</span><span className="material-symbols-outlined size-20">close</span></div>
                        </div>

                        <button onClick={() => excel(props.demands, props.name, props.type)} className="btn-secondary export-spreadsheet">
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
                            <ButtonTableList icon="filter_alt" sendFilter={sendFilter} />
                        }
                    </div>

                    <div className="background-filter" onClick={onButtonPress}>
                        {filter && <Filter onClick={callback} />}
                    </div>
                </div>
            </div>

        </div>
    );
}

