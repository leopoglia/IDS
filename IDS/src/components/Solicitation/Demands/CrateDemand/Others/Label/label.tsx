import { t } from "i18next";


export default function Label(props: any) {
    return (
        <div className="display-flex label">
            <label className="label">{t(props.title)}

                {props.required ? <span className="required">*</span> : null}
            </label>

           
        </div>
    )
}