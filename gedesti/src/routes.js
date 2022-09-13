import { Route, Routes, BrowserRouter } from "react-router-dom";

import Form from './components/Login';
import Demandas from "./components/Demandas";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/demandas" element={<Demandas />} />
            </Routes>
        </BrowserRouter>
    )
}