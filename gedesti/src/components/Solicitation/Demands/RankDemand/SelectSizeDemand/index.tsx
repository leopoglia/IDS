import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Services from '../../../../../services/buService';

export default function SelectLabels(props: any) {
    const [select, setSelect] = useState('');
    const [type, setType] = useState(props.type);
    const [bu, setBu]: any = useState([]);

    const size = ["Muito Pequeno", "Pequeno", "Médio", "Grande", "Muito Grande"]


    useEffect(() => {
        Services.findAll().then((response: any) => {
            setBu(response)
        }
        )
    }, [])


    const buReq = bu
    const buBen = bu
    const ti = ["AI", "Front", "Back"]

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
                return <MenuItem value={bu.buCode}>{bu.buCode} &nbsp; {bu.bu}</MenuItem>
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
            case "buBen":
                // classification.buBen = event.target.value;
                break;
            case "ti":
                classification.ti = event.target.value;
                break;
            default:
                classification.size = event.target.value;
        }

        localStorage.setItem("classification", JSON.stringify(classification));
    };

    return (
        <div className='SelectLabels'>

            <FormControl sx={{ minWidth: "100%", height: "60px" }}>
                <Select
                    value={select}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}

                    sx={{ height: '45px' }}
                >

                    {typeSet()}
                </Select>
            </FormControl>
        </div>
    );
}