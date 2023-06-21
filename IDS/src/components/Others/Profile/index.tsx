import Title from "../../Fixed/Search/Title";
import ServicesWorker from "../../../services/workerService";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "./style.css";

export default function Profile() {

    const { t } = useTranslation();

    const [workerCode, setWorkerCode]: any = useState(parseInt(window.location.href.split("/")[4]));

    const [worker, setWorker] = useState<any>({});

    useEffect(() => {
        ServicesWorker.findById(workerCode).then((res) => {
            setWorker(res);
        });

    }, [])


    return (
        <div className="profile">

            <div className="container">
                <div className="background-title">
                    <Title nav={t("viewProfile")} title="viewProfile" />
                </div>


                <div className="box">

                    <div className="person display-flex-space-between">
                        <div className="display-flex-align-center">
                            <div className="image-profile">{worker?.workerName?.substring(0, 1)}</div>

                            <p className="workerName">{worker.workerName}</p>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}