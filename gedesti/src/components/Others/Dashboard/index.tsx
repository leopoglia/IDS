import Header from "../../Fixed/Header";
import Nav from "../../Fixed/Nav";
import Title from "../../Fixed/Search/Title";
import "./style.css";
import { useEffect, useState } from "react";
import Box from "./Box";
import List from "./List";

export default function Dashboard() {

    const listDashBoard = [
        {
            title: "Número de Demandas criadas",
            number: (Math.random() * 100).toFixed(0),
            icon: "check",
        },
        {
            title: "Número de Demandas esperando classificação",
            number: (Math.random() * 100).toFixed(0),
            icon: "check",
        },
        {
            title: "Número de Demandas esperando aprovação",
            number: (Math.random() * 100).toFixed(0),
            icon: "check",
        },
        {
            title: "Número de Demandas esperando complemento",
            number: (Math.random() * 100).toFixed(0),
            icon: "check",
        },
        {
            title: "Número de Demandas esperando criação da proposta",
            number: (Math.random() * 100).toFixed(0),
            icon: "check",
        },
        {
            title: "Número de Propostas",
            number: (Math.random() * 100).toFixed(0),
            icon: "check",
        },
        {
            title: "Número de Pautas",
            number: (Math.random() * 100).toFixed(0),
            icon: "check",
        },
        {
            title: "Número de Pautas Atas",
            number: (Math.random() * 100).toFixed(0),
            icon: "check",
        },
        {
            title: "Número de Usuários",
            number: (Math.random() * 100).toFixed(0),
            icon: "check",
        }
    ]

    return (<div className="dashboard">


        <Header />
        <Nav />


        <div className="container">

            <Title title="Dashboard" nav="Dashboard" />


            <div className="content">

                <div className="display-flex dashboard-content">
                    <div>
                        <Box />
                        <Box />
                        <Box />
                    </div>

                    <div className="lists-dashboard">

                        {listDashBoard.map((item, index) => {
                            return <List key={index} title={item.title} number={item.number} icon={item.icon} />
                        })
                        }


                    </div>


                </div>

            </div>



        </div>

    </div>)
}