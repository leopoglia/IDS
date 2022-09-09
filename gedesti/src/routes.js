import { Route, Routes, BrowserRouter } from "react-router-dom";

import App from './App';
import Form from './components/Login/Login';
import Header from './components/Fixed/Header/Header';
import Nav from "./components/Fixed/Nav/Nav";
import Demandas from "./components/Demandas/Demandas";
import Title from "./components/Fixed/Search/Title/Title";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/header" element={<Header />} />
                <Route path="/nav" element={<Nav />} />
                <Route path="/demandas" element={<Demandas />} />
                <Route path="/title" element={<Title />} />
            </Routes>
        </BrowserRouter>
    )
}