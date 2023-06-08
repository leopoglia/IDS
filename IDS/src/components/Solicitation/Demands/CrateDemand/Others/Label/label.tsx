import { t } from "i18next";
import othersUtil from "../../../../../../utils/othersUtil";
import { useContext } from "react";
import UserContext from "../../../../../../context/userContext";

export default function Label(props: any) {

    const worker = useContext(UserContext).worker;

    return (
        <div className="display-flex label">
            <label className="label">{t(props.title)}

                {props.required ? <span className="required">*</span> : null}
            </label>


        </div>
    )
}