import "./style.css"
import { useTranslation } from "react-i18next";


export default function Title(props: any) {
    const { t, i18n } = useTranslation();

    return (
        <div className="Title">
            <span>{t(props.nav)}</span>
            <h1>{t(props.title)}</h1>
        </div>
    );
}