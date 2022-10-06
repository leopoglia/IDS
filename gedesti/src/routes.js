import { Route, Routes, BrowserRouter } from "react-router-dom";

import Form from './components/Login';
import Demandas from "./components/Demandas";
import Mensagens from "./components/Mensagens";
import Notificacoes from "./components/Notificacoes";
import Configuracao from "./components/Configuracao";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/demandas" element={<Demandas />} />
                <Route path="/mensagens" element={<Mensagens />} />
                <Route path="/notificacoes" element={<Notificacoes />} />
                <Route path="/configuracao" element={<Configuracao />} />
            </Routes>
        </BrowserRouter>
    )
}