import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";

import Form from './components/Login/Login';
import ForgetPassword from './components/Login/ForgotPassword';
import Demands from "./components/Solicitation/Demands/Demands";
import Messages from "./components/Others/Messages";
import Notifications from "./components/Others/Notifications";
import Configuration from "./components/Others/Configuration";
import CreateDemands1 from "./components/Solicitation/Demands/CrateDemand/Step1";
import CreateDemands2 from "./components/Solicitation/Demands/CrateDemand/Step2";
import CreateDemands3 from "./components/Solicitation/Demands/CrateDemand/Step3";
import ViewDemand from "./components/Solicitation/Demands/ViewDemand";
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
import EscopeDemand from "./components/Solicitation/Proposals/EscopeDemand";
import CreateMinute from "./components/Solicitation/Minutes/CreateMinute";
import Message from "./components/Others/Messages/Message";
import UserContext from "./context/userContext";
import { useState, useEffect } from "react";
import ServicesWorker from "./services/workerService";


export default function Router() {

    const [worker, setWorker] = useState({
        id: "",
        office: "",
        name: "",
        email: "",
        language: ""
    });



    useEffect(() => {
        if (worker.id === "") {
            const id = localStorage.getItem("id");
            if (id !== null) {
                ServicesWorker.findById(JSON.parse(id)).then((response: any) => {
                    const worker = {
                        id: response.workerCode,
                        office: response.workerOffice,
                        name: response.workerName,
                        email: response.corporateEmail,
                        language: response.language
                    }
                    setWorker(worker);
                });
            } else {
                if (window.location.pathname !== "/") {
                    window.location.href = "/";
                }
            }
        }

        console.log(worker);
    }, [worker.id]);



    return (
        <UserContext.Provider
            value={{
                worker: worker,
                setWorker
            }}>
            <BrowserRouter>

                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />

                    <Route path="/messages" element={<Messages />} />
                    <Route path="/messages/message" element={<Message />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/configuration" element={<Configuration />} />

                    <Route path="/demands" element={<Demands />} />
                    <Route path="/demand/create/1" element={<CreateDemands1 />} />
                    <Route path="/demand/create/2" element={<CreateDemands2 />} />
                    <Route path="/demand/create/3" element={<CreateDemands3 />} />
                    <Route path="/demand/view/:id" element={<ViewDemand />} />
                    <Route path="/demand/rank/:id" element={<RankDemand />} />
                    <Route path="/demand/disapprove/:id" element={<DisapproveDemand />} />
                    <Route path="/demand/complement/:id" element={<ComplementDemand />} />
                    <Route path="/demand/historical" element={<HistoricalDemand />} />


                    <Route path="/proposals" element={<Demands />} />
                    <Route path="/proposal/view/:id" element={<ViewDemand />} />
                    <Route path="/proposal/execution-costs/:id" element={<ExecutionCosts />} />
                    <Route path="proposal/execution-costs/add-expense/:id" element={<AddExpense />} />
                    <Route path="/proposal/demand/:id" element={<EscopeDemand />} />
                    <Route path="/proposal/edit-scope/:id" element={<EditProposalScope />} />
                    <Route path="/proposal/comission-opinion" element={<CommissionOpinion />} />
                    <Route path="/proposal/informations/:id" element={<ProposedInformation />} />

                    <Route path="/agendas" element={<Demands />} />
                    <Route path="/agenda/create" element={<CreateAgenda />} />
                    <Route path="/agenda/view/:id" element={<ViewDemand />} />
                    <Route path="/agenda/select-proposals" element={<SelectProposal />} />

                    <Route path="/minutes" element={<Demands />} />
                    <Route path="/minutes/create" element={<CreateMinute />} />

                </Routes>
            </BrowserRouter >
        </UserContext.Provider>

    )
}