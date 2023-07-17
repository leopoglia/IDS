import { useState } from "react"
import { useTranslation } from "react-i18next"
import SelectStatus from "../SelectStatus"
import Input from "../../../../Solicitation/Demands/CrateDemand/Others/Input"


export default function CustomFilter(props: any) {

    const { t } = useTranslation();

    const type = window.location.href.split('/')[3];

    const [requester, setRequester] = useState('')
    const [manager, setManager] = useState('')
    const [forum, setForum] = useState('')
    const [departament, setDepartament] = useState('')
    const [size, setSize] = useState('')
    const [ppmCode, setPpmCode] = useState('')
    const [demandCode, setDemandCode] = useState('')
    const [proposalCode, setProposalCode] = useState('')
    const [status, setStatus] = useState('')
    const [minuteNumber, setMinuteNumber] = useState('')
    const [solicitationDate, setSolicitationDate] = useState('')
    const [minuteCode, setMinuteCode] = useState('')

    const sendFilter = () => {

        if(type === "demands"){
            props.setCustomFilterObject({
                requester,
                manager,
                departament,
                size,
                ppmCode,
                demandCode,
                status
            })
        } else if(type === "proposals"){
            props.setCustomFilterObject({
                requester,
                manager,
                departament,
                size,
                ppmCode,
                forum
            })
        } else if(type === "agendas"){
            props.setCustomFilterObject({
                forum,
                proposalCode
            })
        } else if(type === "minutes"){
            props.setCustomFilterObject({
                minuteNumber,
                solicitationDate,
                minuteCode
            })
        }



    }

    return (
        <div className="background-modal custom-filter">
            <div className="modal">
                <div className='header-calendar display-flex-space-between mb3'>
                    <div className="display-flex-align-center">
                        <span className="material-symbols-outlined">
                            tune
                        </span>

                        <span className="font-p">{t("filterCustom")}</span>
                    </div>

                    <span className='material-symbols-outlined' onClick={() => props.setCustomFilter(!props.customFilter)}>close</span>
                </div>

                <div className="filters-custom">

                    {(type === "demands" || type === "proposals") &&
                        <>
                            <Input type="text" label="requester" value={requester} setValue={setRequester} />

                            <Input type="text" label="manager" value={manager} setValue={setManager} />

                            <Input type="text" label="departament" value={departament} setValue={setDepartament} />

                            <div className="mb10">
                                <label htmlFor="">{t("size")}</label>
                                <SelectStatus status={size} setStatus={setSize} onChange={(e:any) => setSize(e) } array={["Muito pequeno", "Pequeno", "Médio", "Grande", "Muito grande"]} />
                            </div>

                            <Input type="text" label="ppmCode" value={ppmCode} setValue={setPpmCode} />

                            {type !== "proposals" ?
                                <Input type="text" label="demandCode" value={demandCode} setValue={setDemandCode} />
                                :
                                <Input type="text" label="proposalCode" value={forum} setValue={setForum} />
                            }
                        </>
                    }

                    {type === "demands" &&
                        <>
                            < label htmlFor="">{t("status")}</label>
                            <SelectStatus status={status} setStatus={setStatus} onChange={(e:any) => setStatus(e) } array={["Backlog", "BacklogRanked", "BacklogEdit", "BacklogRankApproved", "BacklogComplement", "Assesment"]} />
                        </>
                    }

                    {type === "agendas" &&
                        <>
                            <div className="mb10">
                                < label htmlFor="">{t("forum")}</label>
                                <SelectStatus status={forum} setStatus={setForum} onChange={(e:any) => setForum(e) } array={["CPVM", "CPGCI", "CPGPR", "CGPN", "CTI", "CWBS", "DTI"]} />
                            </div>

                            <Input type="text" label="proposalCode" value={proposalCode} setValue={setProposalCode} />
                        </>
                    }

                    {type === "minutes" &&
                        <>
                            <Input type="text" label="sequentialNumber" value={minuteNumber} setValue={setMinuteNumber} />

                            <Input type="date" label="date" value={solicitationDate} setValue={setSolicitationDate} />

                            <Input type="text" label="codeMinutes" value={minuteCode} setValue={setMinuteCode} />

                        </>
                    }
                </div>

                <button className="btn-primary w100" onClick={sendFilter}>
                    {t("filter")}
                </button>

            </div>
        </div >
    )
}