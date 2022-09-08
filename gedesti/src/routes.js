import { Route, Routes, BrowserRouter } from "react-router-dom";

import App from './App';
import Form from './components/Login/Login';
import Header from './components/Fixed/Header/Header';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/form" element={<Form />} />
                <Route path="/header" element={<Header />} />
            </Routes>
        </BrowserRouter>
    )
}