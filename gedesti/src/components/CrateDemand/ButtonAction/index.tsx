import "./style.css"
import { useState } from "react";

export default function ButtonAction(props: {
    title: string
    click: string
}) {

    function redirectPage(click: string): void {
        console.log(click)
    }

    return (
        <button className="button-action" onClick={() => { redirectPage(props.click) }}>
            {props.title}
        </button>
    );
}