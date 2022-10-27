import "./style.css"
import { useState } from "react";

export default function ButtonAction(props: {
    title: string
    click: any
}) {
    const [button, setButton] = useState(props.title);

    return (
        <button className="button-action" onClick={props.click()}>
            {button}
        </button>
    );
}