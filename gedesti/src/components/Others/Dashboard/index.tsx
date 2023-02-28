import Header from "../../Fixed/Header";
import Nav from "../../Fixed/Nav";
import Title from "../../Fixed/Search/Title";
import "./style.css";
import { useEffect, useState } from "react";
import Box from "./Box";
import List from "./List";
import ServicesDemand from '../../../services/demandService';
import ServicesProposal from '../../../services/proposalService';
import ServicesAgenda from '../../../services/agendaService';
import ServicesMinutes from "../../../services/minuteService";

export default function Dashboard() {

    const [demands, setDemands] = useState(0);
    const [demandsRanked, setDemandsRankes] = useState(0);
    const [demandsApproved, setDemandsApproved] = useState(0);
    const [demandsCompleted, setDemandsCompleted] = useState(0);
    const [demandsCanceled, setDemandsCanceled] = useState(0);
    const [proposal, setProposal] = useState(0);
    const [agendas, setAgendas] = useState(0);
    const [minutes, setMinutes] = useState(0);

    function getDemands() {
        ServicesDemand.findAll().then((response: any) => {
            setDemands(response?.length);

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
            }


        }).catch((error) => {
            console.log(error);
        });
    }

    function getProposal() {
        ServicesProposal.findAll().then((response: any) => {
            setProposal(response?.length);
        }).catch((error) => {
            console.log(error);
        });
    }

    function getAgendas() {
        ServicesAgenda.findAll().then((response: any) => {
            setAgendas(response?.length);
        }).catch((error) => {
            console.log(error);
        });
    }

    function getMinutes() {
        ServicesMinutes.findAll().then((response: any) => {
            setMinutes(response?.length);
            console.log(response.length);
        }).catch((error) => {
            console.log(error);
        });
    }
    

    useEffect(() => {
        getDemands();
        getProposal();
        getAgendas();
        getMinutes();
    }, [demands, proposal, agendas, minutes]);

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
            title: "Demandas complementada",
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
        },
        {
            title: "Atas criadas",
            number: minutes,
            icon: "check",
        }
    ]

    const boxDashBoard = [
        {
            title: "Novas demandas",
            type: "demands",
            number: demands,
            icon: "check",
        },
        {
            title: "Novas Propostas",
            type: "proposal",
            number: proposal,
            icon: "check",
        },
        {
            title: "Novas Pautas",
            type: "agendas",
            number: agendas,
            icon: "check",
        }
    ]



    return (<div className="dashboard">


        <Header />
        <Nav />


        <div className="container">

            <Title title="Dashboard" nav="Dashboard" />


            <div className="content">

                <div className="display-flex dashboard-content">
                    <div>
                        {demands > 0 &&
                            boxDashBoard.map((item, index) => {
                                return <Box key={index} title={item.title} number={item.number} icon={item.icon} />
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

            </div>



        </div>

    </div>)
}