import { useTranslation } from "react-i18next";

import "./style.css"

export default function TextArea(props: {
    label: string;
    required: string;
}) {

    const { t } = useTranslation();

    return (
        <div className="text-area">
            <label>{t(props.label)} {props.required}</label>
            <textarea />
        </div>
    );
}