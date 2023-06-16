import { useTranslation } from "react-i18next";

import "./style.css"

export default function Title(props: any) {
    const { t } = useTranslation();

    return (
        <div className="Title">
            <span>{t(props.nav)}</span>
            <h1>{t(props.title)}</h1>
        </div>
    );
}