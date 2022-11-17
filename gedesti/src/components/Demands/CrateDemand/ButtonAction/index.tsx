import "./style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ButtonAction(props: {
    title: string
    click: string
}) {

    const url = window.location.href.split("/");

    console.log(url[5]);



    if (props.click === "voltar" && url[5] === "1") {
        return (
            <Link className="btn-secondary" to="/demands">
                {props.title}
            </Link>
        );
    }




    if (props.click === "voltar" && url[5] !== "1") {
        return (
            <Link className="btn-secondary" to={"/demand/create/" + (parseInt(url[5]) - 1)}>
                {props.title}
            </Link>
        );
    } else {
        return (
            <Link className="btn-primary" to={"/demand/create/" + (parseInt(url[5]) + 1)}>
                {props.title}
            </Link>
        );
    }
}


