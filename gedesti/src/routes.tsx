import { Route, Routes, BrowserRouter } from "react-router-dom";

import Form from './components/Login/Login';
import Demands from "./components/Solicitation/Demands/Demands";
import Messages from "./components/Others/Messages";
import Message from "./components/Others/Messages/Message";
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
import ExecutionCosts from "./components/Solicitation/Proposals/ExecutionCosts/ExecutionCosts";
import EditProposalScope from "./components/Solicitation/Proposals/EditProposalScope";
import SelectProposal from "./components/Solicitation/Proposals/SelectProposals";
import CreateAgenda from "./components/Solicitation/Agendas/CreateAgenda";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/messages/message" element={<Message />} />
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

                <Route path="/proposals" element={<Demands />} />
                <Route path="/proposal/view" element={<ViewDemand />} />
                <Route path="/proposal/execution-costs" element={<ExecutionCosts />} />
                <Route path="/proposal/edit-scope" element={<EditProposalScope />} />

                <Route path="/agendas" element={<Demands />} />
                <Route path="/agenda/create" element={<CreateAgenda />} />
                <Route path="/agenda/view" element={<ViewDemand />} />
                <Route path="/agenda/select-proposals" element={<SelectProposal />} />

                <Route path="/minutes" element={<Demands />} />
                <Route path="/minute/view" element={<ViewDemand />} />


            </Routes>
        </BrowserRouter>
    )
}