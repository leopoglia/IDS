import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonTableList from "./ButtonSearch";
import Title from "./Title";
import Filter from "./Filter";
import AgendaService from "../../../services/agendaService";
import DemandService from "../../../services/demandService";
import ProposalService from "../../../services/proposalService";
import MinuteService from "../../../services/minuteService";
import "./style.css";
import Mic from "../Accessibility/Mic";
import Input from "../../Solicitation/Demands/CrateDemand/Others/Input";
import Demand from "../../Solicitation/All/Cards/Card";

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


    const excel = (solicitations: any, solicitationType: any, nameFilter: any, typeFilter: any) => {
        let filteredSolicitations: any = [];
        if (solicitationType === "demand") {
            for (let i = 0; i < solicitations.length; i++) {
                if (typeFilter === "requester" && solicitations[i].requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "status" && solicitations[i]?.demandStatus.toUpperCase() === nameFilter.toUpperCase()) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "size" && solicitations[i]?.classification?.classificationSize.toUpperCase() === nameFilter.toUpperCase()) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "ppm" && solicitations[i]?.classification?.ppmCode.toUpperCase() === nameFilter.toUpperCase()) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "code-demand" && solicitations[i]?.demandCode === parseInt(nameFilter)) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "home" && solicitations[i]?.requesterRegistration.workerName === nameFilter) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "department" && solicitations[i]?.requesterRegistration.department === nameFilter) {
                    filteredSolicitations.push(solicitations[i]);
                }
            }
            DemandService.saveExcel(filteredSolicitations).then((response: any) => {
                response.arrayBuffer().then((buffer: ArrayBuffer) => {
                    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    const data = new Date();
                    const dataFormatada =
                        data.getDate() +
                        "-" +
                        (data.getMonth() + 1) +
                        "-" +
                        data.getFullYear();
                    link.href = url;
                    link.download = "demandas - " + dataFormatada + ".xlsx";
                    link.click();
                });
            });
        } else if (solicitationType === "proposal") {
            for (let i = 0; i < solicitations.length; i++) {
                if (typeFilter === "requester" && solicitations[i]?.demand?.requesterRegistration?.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "size" && solicitations[i]?.classification?.classificationSize.toUpperCase() === nameFilter.toUpperCase()) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "ppm" && solicitations[i]?.classification?.ppmCode.toUpperCase() === nameFilter.toUpperCase()) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "code-proposal" && solicitations[i]?.proposalCode === parseInt(nameFilter)) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "department" && solicitations[i].demand?.requesterRegistration.department === nameFilter) {
                    filteredSolicitations.push(solicitations[i]);
                }
            }
            ProposalService.saveExcel(filteredSolicitations).then((response: any) => {
                response.arrayBuffer().then((buffer: ArrayBuffer) => {
                    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    const data = new Date();
                    const dataFormatada =
                        data.getDate() +
                        "-" +
                        (data.getMonth() + 1) +
                        "-" +
                        data.getFullYear();
                    link.href = url;
                    link.download = "propostas - " + dataFormatada + ".xlsx";
                    link.click();
                });
            });
        } else if (solicitationType === "agenda") {
            for (let i = 0; i < solicitations.length; i++) {
                if (typeFilter === "code-agendas") {
                    for (let j = 0; j < solicitations[i]?.proposals.length; j++) {
                        console.log(solicitations[i]?.proposals[j]?.proposalCode, "name: " + nameFilter)
                        if (solicitations[i].proposals[j]?.proposalCode == parseInt(nameFilter)) {
                            filteredSolicitations.push(solicitations[i]);
                        }
                    }
                }
            }
            AgendaService.saveExcel(filteredSolicitations).then((response: any) => {
                response.arrayBuffer().then((buffer: ArrayBuffer) => {
                    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    const data = new Date();
                    const dataFormatada =
                        data.getDate() +
                        "-" +
                        (data.getMonth() + 1) +
                        "-" +
                        data.getFullYear();
                    link.href = url;
                    link.download = "pautas - " + dataFormatada + ".xlsx";
                    link.click();
                });
            });
        } else if (solicitationType === "minute") {
            for(let i = 0; i < solicitations.length; i++) {
                let dateFormat: any;

                // se for menos de 9 colocar 0 na frente
                if (solicitations[i].minuteStartDate?.split("/")[1].length === 1) {
                    dateFormat = solicitations[i].minuteStartDate.split("/")[0] + "0" + solicitations[i].minuteStartDate.split("/")[1] + solicitations[i].minuteStartDate.split("/")[2]
                }
    
                if (typeFilter === "code-minutes" && solicitations[i].minuteCode === parseInt(nameFilter)) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "date" && dateFormat.includes(nameFilter.split("-").reverse().join(""))) {
                    filteredSolicitations.push(solicitations[i]);
                }
            }
            MinuteService.saveExcel(filteredSolicitations).then((response: any) => {
                response.arrayBuffer().then((buffer: ArrayBuffer) => {
                    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    const data = new Date();
                    const dataFormatada =
                        data.getDate() +
                        "-" +
                        (data.getMonth() + 1) +
                        "-" +
                        data.getFullYear();
                    link.href = url;
                    link.download = "atas - " + dataFormatada + ".xlsx";
                    link.click();
                });
            });
        }
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

                        <button onClick={() => excel(props.solicitation, props.solicitationType, props.name, props.type)} className="btn-secondary export-spreadsheet">
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

