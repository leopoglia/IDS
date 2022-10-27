import { Route, Routes, BrowserRouter } from "react-router-dom";

import Form from './components/Login';
import Demands from "./components/Demands";
import Messages from "./components/Messages";
import Notifications from "./components/Notifications";
import Configuration from "./components/Configuration";
import CreateDemands1 from "./components/CrateDemand/Step1";
import CreateDemands2 from "./components/CrateDemand/Step2";
import CreateDemands3 from "./components/CrateDemand/Step3";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/demands" element={<Demands />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/configuration" element={<Configuration />} />
                <Route path="/create-demand/1" element={<CreateDemands1 />} />
                <Route path="/create-demand/2" element={<CreateDemands2 />} />
                <Route path="/create-demand/3" element={<CreateDemands3 />} />

            </Routes>
        </BrowserRouter>
    )
}