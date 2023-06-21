import Title from "../../Fixed/Search/Title";
import ServicesWorker from "../../../services/workerService";
import ServicesDemand from "../../../services/demandService";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "./style.css";
import Input from "../../Solicitation/Demands/CrateDemand/Others/Input"; 
import Profile from "../../Fixed/Profile";

export default function Profiles() {

    const { t } = useTranslation();

    const [workerCode, setWorkerCode] = useState(parseInt(window.location.href.split("/")[4]));
    const [search, setSearch] = useState(""); // Retorno do campo de busca de demandas

    const [worker, setWorker] = useState({});

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

                    <Profile workerCode={worker.workerCode} image={worker.workerName?.slice(0, 1)} workerName={worker.workerName} />


                    <div className="boxNoPadding mt20">
                        <div className="header">

                            <div className="display-flex h65px">
                                <div className="profile-select">
                                    <p>Demandas criadas</p>
                                </div>

                                <div className="profile-select">
                                    <p>Demandas classificadas</p>
                                </div>

                                <div className="profile-select">
                                    <p>Demandas aprovadas</p>
                                </div>

                                <div className="profile-select">
                                    <p>Demandas complementadas</p>
                                </div>

                                <div className="profile-select">
                                    <p>Propostas criadas</p>
                                </div>
                            </div>

                            <div className="display-flex">
                                <Input background={"input-search"} setValue={setSearch} value={search} icon={"search"} type="text" placeholder={t("searchSoliciation")} required={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}