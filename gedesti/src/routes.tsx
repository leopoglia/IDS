import { Route, Routes, BrowserRouter } from "react-router-dom";

import Form from './components/Login';
import Demands from "./components/Demands";
import Messages from "./components/Messages";
import Message from "./components/Message/";
import Notifications from "./components/Notifications";
import Configuration from "./components/Configuration";
import CreateDemands1 from "./components/CrateDemand/Step1";
import CreateDemands2 from "./components/CrateDemand/Step2";
import CreateDemands3 from "./components/CrateDemand/Step3";
import ViewDemand from "./components/ViewDemand";
import RankDemand from "./components/RankDemand";
import DisapproveDemand from "./components/DisapproveDemand";
import ComplementDemand from "./components/ComplementDemand";
import HistoricalDemand from "./components/HistoricalDemand";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/demands" element={<Demands />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/message" element={<Message />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/configuration" element={<Configuration />} />
                <Route path="/create-demand/1" element={<CreateDemands1 />} />
                <Route path="/create-demand/2" element={<CreateDemands2 />} />
                <Route path="/create-demand/3" element={<CreateDemands3 />} />
                <Route path="/demand/view" element={<ViewDemand />} />
                <Route path="/demand/rank" element={<RankDemand />} />
                <Route path="/demand/disapprove" element={<DisapproveDemand />} />
                <Route path="/demand/complement" element={<ComplementDemand />} />
                <Route path="/demand/historical" element={<HistoricalDemand />} />

            </Routes>
        </BrowserRouter>
    )
}