import { t } from "i18next"
import { useEffect, useState } from "react";
import SelectCostExecution from "../SelectCostExecution"
import Services from "../../../../../services/costCenterService";
import ServicesExpenses from "../../../../../services/expensesService";

export default function SelectCostCenter(props: any) {

    const [costCenter, setCostCenter] = useState("");
    const [costsCenters, setCostsCenters]: any = useState([]);
    const [idCostCenter, setIdCostCenter]: any = useState([]);
    let centerOfCustProposal: any = JSON.parse(localStorage.getItem('centerOfCustProposal' + props.type) || '[]');

    const editType = window.location.href.split("?")[1];
    const proposalCode: any = window.location.href.split("/")[5];


    useEffect(() => {

        if (editType !== undefined) {
            ServicesExpenses.findByProposal(proposalCode).then((expenses: any) => {

                expenses.forEach((expense: any) => {
                    if (expense.expensesType === editType) {

                        let costsCentersAux: any[] = [];
                        let idCostCenterAux: any[] = [];

                        expense.expensesCostCenters.forEach((costCenter: any) => {
                            costsCentersAux.push(costCenter.costCenter.costCenter);
                            idCostCenterAux.push(costCenter.costCenter.costCenterCode);
                        });

                        setCostsCenters(costsCentersAux);
                        setIdCostCenter(idCostCenterAux);
                    }
                });
            })

        } else {
            setCostsCenters(JSON.parse(localStorage.getItem('centerOfCustProposal' + props.type) || '[]'));
        }
    }, [localStorage.getItem('costsCenters' + props.type)]);
    



    function addCostCenter(costCenterAdd: any) {
        if (costCenterAdd === "" || costCenterAdd === " ") {
            alert("Digite um centro de custo");
        } else {
            createCostCenter();
            costsCenters.push(costCenterAdd);
            setCostsCenters(costsCenters);
            setCostCenter("");
        }
    }

    async function createCostCenter() {

        let costsCenterBd: any = await Services.findAll();

        let igual = 0;
        let id = 0;
        for (let i = 0; i < costsCenterBd.length; i++) {
            if (costsCenterBd[i].costCenter === costCenter) {
                igual++;
            }
        }

        if (igual === 0) {
            let service: any = await Services.save(costCenter);

            idCostCenter.push(service.costCenterCode);

            localStorage.setItem('centerOfCustProposal' + props.type, JSON.stringify(idCostCenter));

        } else {
            for (let i = 0; i < costsCenterBd.length; i++) {
                if (costsCenterBd[i].costCenter === costCenter) {
                    id = costsCenterBd[i].costCenterCode;
                }
            }
            idCostCenter.push(id);



            centerOfCustProposal.push(idCostCenter);

            localStorage.setItem('centerOfCustProposal' + props.type, JSON.stringify(idCostCenter));
        }

    }

    function deleteCostCenter(costCentere: any) {
        return () => {
            const index = costsCenters.indexOf(costCentere);
            if (index > -1) {
                costsCenters.splice(index, 1);
                idCostCenter.splice(index, 1);
            }
            setCostsCenters(costsCenters);

            if (costCenter === " ") {
                setCostCenter("");
            } else {
                setCostCenter(" ");
            }

            localStorage.setItem('centerOfCustProposal' + props.type, JSON.stringify(idCostCenter));

        }
    }


    return (

        <div className="input">
            <div className="display-flex-grid">

                <div>

                    <label>{t("payingCostCenter")} *</label>


                    <div className="display-flex">
                        <SelectCostExecution setCostCenter={setCostCenter} costCenter={costCenter} addCostCenter={addCostCenter} type="payingCostCenter" />

                        <button className="btn-primary btn-center-cost" onClick={() => { addCostCenter(costCenter) }}>
                            <span className="material-symbols-outlined">
                                add
                            </span>
                        </button>
                    </div>



                    {costsCenters.map((costCenter: any) => {
                        return <div className="cost-center">
                            <span>{costCenter}</span>
                            <span className="material-symbols-outlined delete-cost-center" onClick={deleteCostCenter(costCenter)}>
                                delete
                            </span>

                        </div>
                    })
                    }
                </div>

            </div>

        </div>
    )
}