import Title from "../../Fixed/Search/Title";
import { useTranslation } from "react-i18next";

export default function Profile() {

    const { t } = useTranslation();


    return (
        <div className="profile">

            <div className="container">
                <div className="background-title">
                    <Title nav={t("viewProfile")} title="viewProfile" />
                </div>
            </div>

        </div>
    )
}