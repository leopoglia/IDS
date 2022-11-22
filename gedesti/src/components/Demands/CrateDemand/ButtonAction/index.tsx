import "./style.css";
import { Link } from "react-router-dom";

export default function ButtonAction(props: {
    title: string
    click: string
}) {

    const url = window.location.href.split("/")[5];


    if (props.click === "voltar" && url === "1") {
        return (
            <Link className="btn-secondary" to="/demands">
                {props.title}
            </Link>
        );
    }


    if (props.click === "voltar" && url !== "1") {
        return (
            <Link className="btn-secondary" to={"/demand/create/" + (parseInt(url) - 1)}>
                {props.title}
            </Link>
        );
    } else {
        return (
            <Link className="btn-primary" to={"/demand/create/" + (parseInt(url) + 1)}>
                {props.title}
            </Link>
        );
    }
}


