import "./style.css"
import { useState } from "react";

export default function ButtonAction(props) {
    const [button, setButton] = useState(props.title);

    return (
        <button className="button-action" onClick={props.onClick}>
            {button}
        </button>
    );
}