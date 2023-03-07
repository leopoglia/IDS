import "./style.css"
import { useTranslation } from "react-i18next";

export default function Input(props: {
    label: string;
    required: string;
}) {

    const { t } = useTranslation();

    return (
        <div className="input">
            <label>{t(props.label)} {props.required}</label>
            <input  type="text" />
        </div>
    );
}