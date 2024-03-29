import { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Services from '../../../../../services/buService';
import ServicesDemand from '../../../../../services/demandService';

export default function SelectLabels(props: any) {
    const [select, setSelect] = useState('');
    const [type, setType] = useState(props.type);
    const [bu, setBu]: any = useState([]);

    const size = ["Muito Pequeno", "Pequeno", "Médio", "Grande", "Muito Grande"];

    const codeDemand = parseInt(window.location.href.split("/")[5]);
    const edit = window.location.href.split("?")[2];

    useEffect(() => {
        Services.findAll().then((response: any) => {
            setBu(response)
        }
        )
    }, [])


    const buReq = bu
    const buBen = bu
    const ti = [
        "SVE - Seção Desenvolvimento Sistemas de Vendas e E - commerce",
        "SIM – Seção Desenvolvimento Sistemas de manufatura",
        "SIE – Seção Desenvolvimento Sistemas de Engenhar",
        "SDO – Setor Desenvolvimento Plataforma Orchestra",
        "SCO – Seção Desenvolvimento Sistemas Corporativos",
        "PTI – Seção Projetos de TI",
        "AGD – Seção Arquitetura e Governança de Dados",
        "STD – Seção Desenvolvimento Tecnologias Digitais",
        "TIN – Seção Tecnologia de Infraestrutura",
        "SGI - Secao Suporte Global Infraestrutura",
        "SEG - Secao Seguranca da Informacao e Riscos TI",
        "AAS – Atendimento e serviços TI – América do Sul",
    ]

    const typeChange = (type: string) => {
        switch (type) {
            case "size":
                return size
            case "buReq":
                return buReq
            case "buBen":
                return buBen
            case "ti":
                return ti
            default:
                return size
        }
    }

    const typeSet = () => {
        let type = typeChange(props.type)

        if (props.type === "buBen" || props.type === "buReq") {
            return type.map((bu: any) => {
                return <MenuItem value={bu.buCode}>{bu.bu}</MenuItem>
            })
        } else {
            return type.map((bu: any) => {
                return <MenuItem value={bu}>{bu}</MenuItem>
            })
        }


    }

    const handleChange = (event: SelectChangeEvent) => {
        if (props.type === "buBen") {
            props.setBuBenefiteds([...props.buBenefiteds, event.target.value])

            let classfication = JSON.parse(localStorage.getItem("classification") || "{}");
            classfication.buBenList = [...props.buBenefiteds, event.target.value];
            localStorage.setItem("classification", JSON.stringify(classfication));
        }

        if (props.type === "deadline") {
            props.setDeadlineDemand(event.target.value)
        }


        setSelect(event.target.value);

        let classification = {
            size: "",
            buReq: "",
            ti: ""
        };

        if (localStorage.getItem("classification") !== null) {
            classification = JSON.parse(localStorage.getItem("classification") || "{}");
        }

        switch (type) {
            case "size":
                classification.size = event.target.value;
                break;
            case "buReq":
                classification.buReq = event.target.value;
                break;
            case "ti":
                classification.ti = event.target.value;
                break;
        }

        localStorage.setItem("classification", JSON.stringify(classification));
    };

    useEffect(() => {
        let classification = {};
        if (edit !== "edit") {
            classification = JSON.parse(localStorage.getItem("classification") || "{}");
            setTypes(classification);
        } else {
            classification = getDemand();
        }
    }, [])

    const getDemand = async () => {
        ServicesDemand.findById(codeDemand).then((response: any) => {
            let classification = {
                size: response.classification.classificationSize,
                buReq: response.classification.requesterBu.buCode,
                buBenList: response.classification.beneficiaryBu.buCode,
                ti: response.classification.itSection
            };

            setTypes(classification)

        })
    }

    const setTypes = async (classification: any) => {

        if (classification !== null && classification !== undefined) {
            switch (type) {
                case "size":
                    setSelect(classification.size);
                    break;
                case "buReq":
                    setSelect(classification.buReq);
                    break;
                case "buBen":
                    setSelect(classification.buBenList);
                    break;
                case "ti":
                    setSelect(classification.ti);
                    break;
            }
        }
    }

    return (
        <div className='SelectLabels'>
            <FormControl sx={{ minWidth: "100%", height: "60px" }}>
                <Select
                    value={select}
                    displayEmpty
                    onChange={handleChange}
                    sx={{ height: '45px' }}
                >
                    {typeSet()}
                </Select>
            </FormControl>
        </div>
    );
}