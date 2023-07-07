import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Title from "../../Fixed/Search/Title";
import Box from "./Box";
import List from "./List";
import ServicesDemand from '../../../services/demandService';
import ServicesProposal from '../../../services/proposalService';
import ServicesAgenda from '../../../services/agendaService';
import ServicesMinutes from "../../../services/minuteService";
import Footer from "../../Fixed/Footer";
import othersUtil from "../../../utils/othersUtil";
import "./style.css";

export default function Dashboard() {

    const { t } = useTranslation();

    const [url, setUrl] = useState(window.location.href);
    const [demands, setDemands] = useState(0);

    const [demandsDates, setDemandsDates]: any = useState([]);
    const [proposalDates, setProposalDates]: any = useState([]);
    const [agendaDates, setAgendaDates]: any = useState([]);

    const [demandsRanked, setDemandsRankes]:any = useState([]);
    const [demandsApproved, setDemandsApproved]:any = useState([]);
    const [demandsCompleted, setDemandsCompleted]:any = useState([]);
    const [demandsCanceled, setDemandsCanceled]:any = useState([]);
    const [proposal, setProposal]:any = useState([]);
    const [agendas, setAgendas]:any = useState([]);
    const [minutes, setMinutes]:any = useState([]);

    async function getDemands() {
        await ServicesDemand.findAllByVersion().then((response: any) => {
            setDemands(response?.length);
            let dates: any = [];

            for (let i = 0; i < response.length; i++) {
                if (response[i].demandStatus === "BacklogRanked") {
                    demandsRanked.push(response[i].demandDate)
                    setDemandsRankes(demandsRanked);
                }
                if (response[i].demandStatus === "BacklogRankApproved") {
                    demandsApproved.push(response[i].demandDate)
                    setDemandsApproved(demandsApproved);                   
                }
                if (response[i].demandStatus === "BacklogComplement") {
                    demandsCompleted.push(response[i].demandDate)
                    setDemandsCompleted(demandsCompleted);
                }
                if (response[i].demandStatus === "Cancelled") {
                    demandsCanceled.push(response[i].demandDate)
                    setDemandsCanceled(demandsCanceled);
                }
                
                dates.push(othersUtil.removeZeroDate(othersUtil.formatDate(response[i].demandDate)));
            }

            setDemandsDates(dates);

        }).catch((error) => {
            console.log(error);
        });
    }

    async function getProposal() {
        await ServicesProposal.findAll().then((response: any) => {
            setProposal(response?.length);
            let dates: any = [];
            for (let i = 0; i < response.length; i++) {
                dates.push(response[i].proposalDate);
            }

            setProposalDates(dates);

        }).catch((error) => {
            console.log(error);
        });
    }

    async function getAgendas() {
        await ServicesAgenda.findAll().then((response: any) => {
            setAgendas(response?.length);
            let dates: any = [];

            for (let i = 0; i < response.length; i++) {
                dates.push(response[i].agendaDate);
            }

            setAgendaDates(dates);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function getMinutes() {
        await ServicesMinutes.findAll().then((response: any) => {
            setMinutes(response?.length);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getDemands();
        getProposal();
        getAgendas();

    }, [demands, proposal, agendas, minutes, url]);

    const listDashBoard = [
        {
            title: t("createdDemands"),
            number: demandsDates,
            icon: "check",
        },
        {
            title: t("classifiedDemands"),
            number: demandsRanked,
            icon: "check",
        },
        {
            title: t("demandsApprovedByManager"),
            number: demandsApproved,
            icon: "check",
        },
        {
            title: t("complementedDemands"),
            number: demandsCompleted,
            icon: "check",
        },
        {
            title: t("canceledDemands"),
            number: demandsCanceled,
            icon: "check",
        },
        {
            title: t("proposalsCreated"),
            number: proposalDates,
            icon: "check",
        },
        {
            title: t("agendasCreated"),
            number: agendaDates,
            icon: "check",
        }
    ]

    const boxDashBoard = [
        {
            title: t("newDemands"),
            type: "demands",
            number: demands,
            icon: "check",
            dates: demandsDates
        },
        {
            title: t("newProposals"),
            type: "proposal",
            number: proposal,
            icon: "check",
            dates: proposalDates
        },
        {
            title: t("newAgendas"),
            type: "agendas",
            number: agendas,
            icon: "check",
            dates: agendaDates
        }
    ]

    return (<div className="dashboard">

        <div className="container">

            <Title title="dashboard" nav="dashboard" />


            <div className="content">

                <div className="display-flex dashboard-content">
                    <div>
                        {
                            boxDashBoard.map((item, index) => {
                                return <Box key={index} title={item.title} dates={item.dates} number={item.number} icon={item.icon} type={item.type} />
                            })
                        }

                    </div>

                    <div className="lists-dashboard">

                        {listDashBoard.map((item, index) => {
                            return <List key={index} title={item.title} number={item.number} icon={item.icon} />
                        })
                        }


                    </div>

                </div>

                <Footer />

            </div>

        </div>

    </div>)
}