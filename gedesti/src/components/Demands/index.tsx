import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Search from "../Fixed/Search";
import Demand from "./Demand";
import Footer from "../Fixed/Footer";
import { useState } from "react";

export default function Demands() {

    const url = window.location.href.split("/");

    console.log(url[3])

    const [table, setTableList] = useState(false);

    const setTable = () => {
        setTableList(!table);
    }

    return (
        <div className="demands">
            <Header icon="folder_copy" title="Demandas" />
            <Nav />

            <div className="container">
                <Search nav="Demandas > Visualizar Demandas" title="Demandas" button="Criar Demand" link="/demand/create/1" setTable={setTable} />


                <Demand listDirection={table} />
                <Demand listDirection={table} />
                <Demand listDirection={table} />
                <Demand listDirection={table} />
                <Demand listDirection={table} />
                <Demand listDirection={table} />
                <Demand listDirection={table} />


                <div className="navigator">
                    <div className="current">1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>{">"}</div>

                </div>

                <Footer />

            </div>


        </div>
    );
}