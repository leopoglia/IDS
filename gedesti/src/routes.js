import { Route, Routes, BrowserRouter } from "react-router-dom";

import Form from './components/Login';
import Demands from "./components/Demands";
import Messages from "./components/Messages";
import Notifications from "./components/Notifications";
import Configuracao from "./components/Configuracao";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/demands" element={<Demands />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/configuracao" element={<Configuracao />} />
            </Routes>
        </BrowserRouter>
    )
}