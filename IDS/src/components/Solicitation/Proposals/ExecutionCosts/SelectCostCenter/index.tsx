import { t } from "i18next"
import { useEffect, useState } from "react";

import SelectCostExecution from "../SelectCostExecution"
import Services from "../../../../../services/costCenterService";
import ServicesExpenses from "../../../../../services/expensesService";

export default function SelectCostCenter(props: any) {
    const [costCenter, setCostCenter] = useState("");
    const [costsCenters, setCostsCenters]: any = useState([]);
    const [idCostCenter, setIdCostCenter]: any = useState([]);
    const editType = window.location.href.split("?")[1];
    const proposalCode: any = window.location.href.split("/")[5];
    let centerOfCustProposal: any = JSON.parse(localStorage.getItem('centerOfCustProposal' + props.type) || '[]');


    useEffect(() => {
        if (editType !== undefined) {

            ServicesExpenses.findByProposal(proposalCode).then((expenses: any) => {
                expenses.forEach((expense: any) => {
                    if (expense.expensesType === editType) {
                        let costsCentersAux: any[] = [];
                        let idCostCenterAux: any[] = [];
                        expense.expensesCostCenters.forEach((costCenter: any) => {

                            costCenter.costCenter = { "costCenterCode": costCenter.costCenter.costCenterCode, "percent": costCenter.percent, "edit": true };

                            costsCentersAux.push(costCenter.costCenter);
                            idCostCenterAux.push(costCenter.costCenter.costCenterCode);
                        });

                        setCostsCenters(costsCentersAux);
                        setIdCostCenter(idCostCenterAux);
                    }
                });
            });
        } else {
            setCostsCenters(JSON.parse(localStorage.getItem('centerOfCustProposal' + props.type) || '[]'));

        }
    }, [localStorage.getItem("costsCenters" + props.type)]);

    function addCostCenter(costCenterAdd: any) {
        if (costCenterAdd === "" || costCenterAdd === " ") {
            alert("Digite um centro de custo");
        } else {
            createCostCenter();

            setCostsCenters(costsCenters.concat({ costCenterCode: costCenterAdd }));
            setCostCenter("");
        }
    }

    async function createCostCenter() {
        let costsCenterBd: any = await Services.findAll();

        let igual = 0;
        let id = {};
        for (let i = 0; i < costsCenterBd.length; i++) {
            if (costsCenterBd[i].costCenter === costCenter) {
                igual++;
            }
        }

        if (igual === 0) {
            let service: any = await Services.save(costCenter);

            setIdCostCenter(idCostCenter.concat({ costCenterCode: service.costCenterCode, costCenter: service.costCenter }));

            localStorage.setItem(
                "centerOfCustProposal" + props.type,
                JSON.stringify(idCostCenter)
            );
        } else {
            for (let i = 0; i < costsCenterBd.length; i++) {
                if (costsCenterBd[i].costCenter === costCenter) {
                    id = { costCenterCode: costsCenterBd[i].costCenterCode, costCenter: costsCenterBd[i].costCenter };
                }
            }
            setIdCostCenter(idCostCenter.concat(id));

            centerOfCustProposal.push(idCostCenter);

            localStorage.setItem(
                "centerOfCustProposal" + props.type,
                JSON.stringify(idCostCenter)
            );
        }
    }

    function deleteCostCenter(costCenter: any) {
        return () => {
            const updatedCostsCenters = costsCenters.filter(
                (center: any) => center.costCenterCode !== costCenter.costCenterCode
            );
            const updatedIdCostCenter = idCostCenter.filter(
                (center: any) => center.costCenterCode !== costCenter.costCenterCode
            );
            setCostsCenters(updatedCostsCenters);
            setIdCostCenter(updatedIdCostCenter);

            if (costCenter === " ") {
                setCostCenter("");
            } else {
                setCostCenter(" ");
            }

            localStorage.setItem(
                "centerOfCustProposal" + props.type,
                JSON.stringify(updatedIdCostCenter)
            );
        };
    }


    const handlePercentage = (
        e: React.ChangeEvent<HTMLInputElement>,
        costCenterActual: any
    ) => {
        let value = parseInt(e.target.value, 10);
        if (value > 100) {
            value = 100;
        }
        if (value < 0) {
            value = 0;
        }


        const updatedCostCenters = idCostCenter.map((costCenter: any) => {

            if (costCenter.costCenterCode === costCenterActual.costCenterCode) {
                return {
                    ...costCenter,
                    percent: value,
                };
            }
            return costCenter;
        });

        setCostsCenters(updatedCostCenters);
        setIdCostCenter(updatedCostCenters);
        localStorage.setItem(
            "centerOfCustProposal" + props.type,
            JSON.stringify(updatedCostCenters)
        );
    };




    return (
            <div className="display-flex-grid">
                <div>
                    <label>{t("payingCostCenter")} *</label>
                    <div className="display-flex">
                        <SelectCostExecution
                            setCostCenter={setCostCenter}
                            costCenter={costCenter}
                            addCostCenter={addCostCenter}
                            type="payingCostCenter"
                            edit={editType}
                        />
                        <button
                            className="btn-primary btn-center-cost"
                            onClick={() => {
                                addCostCenter(costCenter);
                            }}
                        >
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>

                    {idCostCenter.map((costCenter: any) => {
                        return (
                            <div className="cost-center" key={costCenter.costCenterCode}>
                                <span>{costCenter.costCenterCode}</span>
                                <div className="percentage">
                                    <input className="input"
                                        value={costCenter.percent}
                                        type="number"
                                        placeholder="%"
                                        min={0}
                                        max={100}
                                        onChange={(e) => handlePercentage(e, costCenter)}
                                    />
                                    <span
                                        className="material-symbols-outlined delete-cost-center"
                                        onClick={deleteCostCenter(costCenter)}>
                                        delete
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
    );
}