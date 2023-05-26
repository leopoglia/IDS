import { Tooltip } from "@mui/material";
import { t } from "i18next";


export default function Label(props: any) {
    return (
        <div className="display-flex label">
            <label>{t(props.title)}

                {props.required ? <span className="required">*</span> : null}
            </label>

            {/* <Tooltip title={t(props.textInfo)} placement="right" arrow>
                <span className="material-symbols-outlined">
                    info
                </span>
            </Tooltip> */}
        </div>
    )
}