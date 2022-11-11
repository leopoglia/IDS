import { Route, Routes, BrowserRouter } from "react-router-dom";

import Form from './components/Login';
import Demands from "./components/Demands";
import Messages from "./components/Messages";
import Message from "./components/Message/";
import Notifications from "./components/Notifications";
import Configuration from "./components/Configuration";
import CreateDemands1 from "./components/Demands/CrateDemand/Step1";
import CreateDemands2 from "./components/Demands/CrateDemand/Step2";
import CreateDemands3 from "./components/Demands/CrateDemand/Step3";
import ViewDemand from "./components/Demands/ViewDemand";
import RankDemand from "./components/Demands/RankDemand";
import DisapproveDemand from "./components/Demands/DisapproveDemand";
import ComplementDemand from "./components/Demands/ComplementDemand";
import HistoricalDemand from "./components/Demands/HistoricalDemand";
import Proposals from "./components/Proposals";
import Agendas from "./components/Agendas";
import Minutes from "./components/Minutes";
import ExecutionCosts from "./components/Proposals/ExecutionCosts/ExecutionCosts";
import EditProposalScope from "./components/Proposals/EditProposalScope";
import SelectProposal from "./components/Proposals/SelectProposals";
import CreateAgenda from "./components/Agendas/CreateAgenda";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/message" element={<Message />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/configuration" element={<Configuration />} />

                <Route path="/demands" element={<Demands />} />
                <Route path="/demand/create/1" element={<CreateDemands1 />} />
                <Route path="/demand/create/2" element={<CreateDemands2 />} />
                <Route path="/demand/create/3" element={<CreateDemands3 />} />
                <Route path="/demand/view" element={<ViewDemand />} />
                <Route path="/demand/rank" element={<RankDemand />} />
                <Route path="/demand/disapprove" element={<DisapproveDemand />} />
                <Route path="/demand/complement" element={<ComplementDemand />} />
                <Route path="/demand/historical" element={<HistoricalDemand />} />

                <Route path="/proposals" element={<Proposals />} />
                <Route path="/proposal/view" element={<ViewDemand />} />
                <Route path="/proposal/execution-costs" element={<ExecutionCosts />} />
                <Route path="/proposal/edit-scope" element={<EditProposalScope />} />

                <Route path="/agendas" element={<Agendas />} />
                <Route path="/agenda/create" element={<CreateAgenda />} />
                <Route path="/agenda/view" element={<ViewDemand />} />
                <Route path="/agenda/select-proposals" element={<SelectProposal />} />

                <Route path="/minutes" element={<Minutes />} />
                <Route path="/minute/view" element={<ViewDemand />} />


            </Routes>
        </BrowserRouter>
    )
}