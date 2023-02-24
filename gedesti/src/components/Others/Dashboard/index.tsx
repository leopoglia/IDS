import Header from "../../Fixed/Header";
import Nav from "../../Fixed/Nav";
import Title from "../../Fixed/Search/Title";
import "./style.css";
import { useEffect, useState } from "react";
import Box from "./Box";

export default function Dashboard() {

    return (<div className="dashboard">


        <Header />
        <Nav />


        <div className="container">

            <Title title="Dashboard" nav="Dashboard" />


            <div className="content">

                <div className="display-flex">

                    <Box />
                    <Box />
                    <Box />


                </div>

            </div>



        </div>

    </div>)
}