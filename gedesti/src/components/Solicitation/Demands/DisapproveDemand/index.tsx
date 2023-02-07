import { t } from "i18next";
import Footer from "../../../Fixed/Footer";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import "./style.css"
import { Link } from "react-router-dom";
import { toast, ToastContainer, TypeOptions } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import ButtonAction from "../CrateDemand/ButtonAction";
import DemandService from "../../../../services/demandService";
import Services from "../../../../services/reproachService";


export default function DisapproveDemand() {

    const [disapprovalReason, setDisapprovalReason]: any = useState("");
    const navigate = useNavigate();
    const url = window.location.href.split("/")[3];
    const demandCode = parseInt(window.location.href.split("/")[5]);

    function disapproveDemand() {
        Services.save(disapprovalReason, demandCode).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        }
        );
        DemandService.updateStatus(demandCode, "Cancelled").then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    const nextStep = () => {
        if (disapprovalReason === undefined || disapprovalReason === undefined) {
            notify();
        } else {
            disapproveDemand();
            navigate('/demand/view/' + demandCode);
        }
    }

    return (
        <div className="disapprove-demand">

            <Header icon="close" title="disapproveDemand" />

            <Nav />

            <div className="container">

                <div className="background-title">

                    <Title nav={t("demandViewDisapprove")} title={t("disapproveDemand")} />

                </div>

                <div className="box">

                    <div className="disapprove-demand">

                        <div className="display-grid">
                            <label htmlFor="">{t("reasonForDisapproval")} *</label>

                            <textarea onChange={(e) => { setDisapprovalReason(e.target.value) }} />
                        </div>
                    </div>

                </div>

                <div className="demands-footer">

                    <Link to={"/demand/view/" + url}>
                        <button className="btn-secondary">{t("return")}</button>
                    </Link>


                    <div onClick={() => { nextStep() }}>
                        <ButtonAction click="fail"></ButtonAction>
                    </div>

                </div>

                <Footer />

            </div>
            <ToastContainer position="bottom-right" newestOnTop />

        </div>
    );
}


const notify = () => {
    toast.error('Preencha todos os campos!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};