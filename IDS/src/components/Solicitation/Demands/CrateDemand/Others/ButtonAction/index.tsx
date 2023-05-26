import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./style.css";

export default function ButtonAction(props: any) {

    const { t } = useTranslation();

    if (props.click === "voltar") {
        if (props.page === "0") {
            return (
                <Link to="/demands/1">
                    <button className="btn-secondary">
                        {t("return")}
                    </button>
                </Link>
            );
        } else {
            return (
                <Link to={"/demand/create/" + props.page}>
                    <button className="btn-secondary">
                        {t("return")}
                    </button>
                </Link>
            );
        }
    } else {
        return (
            <button className="btn-primary">
                {t("advance")}
            </button>
        );
    }
}


