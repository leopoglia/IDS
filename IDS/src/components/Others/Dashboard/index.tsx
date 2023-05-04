import Title from "../../Fixed/Search/Title";
import "./style.css";
import { useEffect, useState } from "react";
import Box from "./Box";
import List from "./List";
import ServicesDemand from '../../../services/demandService';
import ServicesProposal from '../../../services/proposalService';
import ServicesAgenda from '../../../services/agendaService';
import ServicesMinutes from "../../../services/minuteService";
import Footer from "../../Fixed/Footer";
import { useTranslation } from "react-i18next";

export default function Dashboard() {

    const { t } = useTranslation();

    const [url, setUrl] = useState(window.location.href);
    const [demands, setDemands] = useState(0);

    const [demandsDates, setDemandsDates]: any = useState([]);
    const [proposalDates, setProposalDates]: any = useState([]);
    const [agendaDates, setAgendaDates]: any = useState([]);

    const [demandsRanked, setDemandsRankes] = useState(0);
    const [demandsApproved, setDemandsApproved] = useState(0);
    const [demandsCompleted, setDemandsCompleted] = useState(0);
    const [demandsCanceled, setDemandsCanceled] = useState(0);
    const [proposal, setProposal] = useState(0);
    const [agendas, setAgendas] = useState(0);
    const [minutes, setMinutes] = useState(0);

    async function getDemands() {
        await ServicesDemand.findAll().then((response: any) => {
            setDemands(response?.length);
            let dates: any = [];


            for (let i = 0; i < response.length; i++) {
                if (response[i].demandStatus === "BacklogRanked") {
                    setDemandsRankes(demandsRanked + 1);
                }
                if (response[i].demandStatus === "BacklogRankApproved") {
                    setDemandsApproved(demandsApproved + 1);
                }
                if (response[i].demandStatus === "BacklogComplement") {
                    setDemandsCompleted(demandsCompleted + 1);
                }
                if (response[i].demandStatus === "Cancelled") {
                    setDemandsCanceled(demandsCanceled + 1);
                }

                dates.push(response[i].demandDate);
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
            title: "Demandas criadas",
            number: demands,
            icon: "check",
        },
        {
            title: "Demandas classificadas",
            number: demandsRanked,
            icon: "check",
        },
        {
            title: "Demandas aprovadas pelo gerente",
            number: demandsApproved,
            icon: "check",
        },
        {
            title: "Demandas complementadas",
            number: demandsCompleted,
            icon: "check",
        },
        {
            title: "Demandas canceladas",
            number: demandsCanceled,
            icon: "check",
        },
        {
            title: "Propostas criadas",
            number: proposal,
            icon: "check",
        },
        {
            title: "Pautas criadas",
            number: agendas,
            icon: "check",
        }
    ]

    const boxDashBoard = [
        {
            title: "Novas demandas",
            type: "demands",
            number: demands,
            icon: "check",
            dates: demandsDates
        },
        {
            title: "Novas Propostas",
            type: "proposal",
            number: proposal,
            icon: "check",
            dates: proposalDates
        },
        {
            title: "Novas Pautas",
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