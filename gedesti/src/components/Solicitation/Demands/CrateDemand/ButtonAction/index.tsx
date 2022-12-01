import "./style.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ButtonAction(props: {
    title: string
    click: string
}) {

    const { t } = useTranslation();

    const url = window.location.href.split("/")[5];


    if (props.click === "voltar" && url === "1") {
        return (
            <Link className="btn-secondary" to="/demands">
                {t("return")}
            </Link>
        );
    }


    if (props.click === "voltar" && url !== "1") {
        return (
            <Link className="btn-secondary" to={"/demand/create/" + (parseInt(url) - 1)}>
                {t("return")}
            </Link>
        );
    } else {
        return (
            <Link className="btn-primary" to={"/demand/create/" + (parseInt(url) + 1)}>
                {t("advance")}
            </Link>
        );
    }
}


