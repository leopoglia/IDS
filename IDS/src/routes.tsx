import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import { WebSocketService } from "./services/webSocketService";

import UserContext from "./context/userContext";
import ServicesWorker from "./services/workerService";
import Cookies from 'js-cookie';

import Form from './components/Login/Login';
import ForgetPassword from './components/Login/ForgotPassword';
import Demands from "./components/Solicitation/All/Cards";
import Messages from "./components/Others/Messages";
import Notifications from "./components/Others/Notifications";
import Configuration from "./components/Others/Configuration";
import CreateDemands1 from "./components/Solicitation/Demands/CrateDemand/Step1";
import CreateDemands2 from "./components/Solicitation/Demands/CrateDemand/Step2";
import CreateDemands3 from "./components/Solicitation/Demands/CrateDemand/Step3";
import ViewDemand from "./components/Solicitation/All/View";
import RankDemand from "./components/Solicitation/Demands/RankDemand";
import DisapproveDemand from "./components/Solicitation/Demands/DisapproveDemand";
import ComplementDemand from "./components/Solicitation/Demands/ComplementDemand";
import HistoricalDemand from "./components/Solicitation/Demands/HistoricalDemand";
import ExecutionCosts from "./components/Solicitation/Proposals/ExecutionCosts";
import EditProposalScope from "./components/Solicitation/Proposals/EditProposalScope";
import SelectProposal from "./components/Solicitation/Proposals/SelectProposals";
import CreateAgenda from "./components/Solicitation/Agendas/CreateAgenda";
import CommissionOpinion from "./components/Solicitation/Proposals/CommissionOpinion";
import AddExpense from "./components/Solicitation/Proposals/AddExpense/index";
import ProposedInformation from "./components/Solicitation/Proposals/ProposedInformation";
import CreateMinute from "./components/Solicitation/Minutes/CreateMinute";
import Message from "./components/Others/Messages/Message";
import Dashboard from "./components/Others/Dashboard";
import EditDemand from "./components/Solicitation/All/Edit";
import Error from "./components/Others/Error";
import Header from "./components/Fixed/Header";
import Nav from "./components/Fixed/Nav";

export default function Router() {

    // Contexto do usuário
    const [worker, setWorker] = useState({ id: "", office: "", name: "", email: "", language: "", voiceCommand: false});

    useEffect(() => {
        // Verifica se o usuário não está na tela de login
        if (window.location.pathname !== "/") {
            let workerCode; // Variável que armazena o código do usuário

            let cookieUser: any = Cookies?.get('user'); // Pega o cookie do usuário

            // Verifica se o cookie existe
            if (cookieUser !== undefined) {
                // Pega o código do usuário
                workerCode = JSON.parse(cookieUser).worker.workerCode;
            }

            if (worker.id === "") {

                if (workerCode !== null && workerCode !== undefined) { // Verifica se o código do usuário existe

                    // Busca os dados do usuário
                    ServicesWorker.findById(JSON.parse(workerCode)).then((response: any) => {
                        const worker = {
                            id: response.workerCode,
                            office: response.workerOffice,
                            name: response.workerName,
                            email: response.corporateEmail,
                            language: response.language,
                            voiceCommand: response.voiceCommand
                        }
                        setWorker(worker); // Seta os dados do usuário no context
                    });
                } else {
                    if (window.location.pathname !== "/") {
                        window.location.href = "/";  // Redireciona para a tela de login
                    }
                }
            }
        }
    }, [worker.id]);



    return (
        <>
            <WebSocketService>
                <UserContext.Provider
                    value={{
                        worker: worker,
                        setWorker
                    }}>

                    <BrowserRouter>

                        <RouterContent />

                    </BrowserRouter >
                </UserContext.Provider>
            </WebSocketService>
        </>
    )
}


function RouterContent() {
    const location = useLocation(); // get the current path

    return (

        <>
            {location.pathname !== '/' && location.pathname !== '/forget-password' && (
                <>
                    <Header />
                    <Nav />
                </>
            )}

            <Routes>
                <Route path="/" element={<Form />} />

                <Route path="/forget-password" element={<ForgetPassword />} />

                <Route path="/messages" element={<Messages />} />
                <Route path="/messages/message/:id" element={<Message />} />
                <Route path="/notifications/:id" element={<Notifications />} />
                <Route path="/configuration" element={<Configuration />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/demands/:page" element={<Demands />} />
                <Route path="/demand/create/1" element={<CreateDemands1 />} />
                <Route path="/demand/create/2" element={<CreateDemands2 />} />
                <Route path="/demand/create/3" element={<CreateDemands3 />} />
                <Route path="/demand/view/:id" element={<ViewDemand />} />
                <Route path="/demand/rank/:id" element={<RankDemand />} />
                <Route path="/demand/disapprove/:id" element={<DisapproveDemand />} />
                <Route path="/demand/complement/:id" element={<ComplementDemand />} />
                <Route path="/demand/historical/:id" element={<HistoricalDemand />} />
                <Route path="/demand/edit/:id" element={<EditDemand />} />

                <Route path="/proposals/:id" element={<Demands />} />
                <Route path="/proposal/view/:id" element={<ViewDemand />} />
                <Route path="/proposal/execution-costs/:id" element={<ExecutionCosts />} />
                <Route path="proposal/execution-costs/add-expense/:id" element={<AddExpense />} />
                <Route path="/proposal/demand/:id" element={<EditDemand />} />
                <Route path="/proposal/edit-scope/:id" element={<EditProposalScope />} />
                <Route path="/proposal/comission-opinion/:id" element={<CommissionOpinion />} />
                <Route path="/proposal/informations/:id" element={<ProposedInformation />} />
                <Route path="/proposal/edit/:id" element={<EditDemand />} />


                <Route path="/agendas/:id" element={<Demands />} />
                <Route path="/agenda/create" element={<CreateAgenda />} />
                <Route path="/agenda/view/:id" element={<ViewDemand />} />
                <Route path="/agenda/select-proposals" element={<SelectProposal />} />

                <Route path="/minutes/:id" element={<Demands />} />
                <Route path="/minutes/create/:id" element={<CreateMinute />} />
                <Route path="/minute/view/:id" element={<ViewDemand />} />

                <Route path="*" element={<Error />} />
            </Routes>
        </>

    )
}