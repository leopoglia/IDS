import "./style.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ButtonAction(props: {
    click: string
}) {

    const { t } = useTranslation();
    const url = window.location.href.split("/")[5];


    if (props.click === "voltar") {
        return (
            <button className="btn-secondary">
                {t("return")}
            </button>
        );
    } else {
        return (
            <button className="btn-primary">
                {t("advance")}
            </button>
        );
    }
}


