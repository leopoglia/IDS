import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels(props: any) {
    const [select, setSelect] = React.useState('');
    const [type, setType] = React.useState(props.type);

    const size = ["Pequeno", "Médio", "Grande"]
    const buReq = ["WEG Motores", "WEG Tintas", "WEG Automação", "WEG Energia", "WEG Digital", "WEG Transmissão & Distribuição", "WEG Serviços"]
    const buBen = ["WEG Motores", "WEG Tintas", "WEG Automação", "WEG Energia", "WEG Digital", "WEG Transmissão & Distribuição", "WEG Serviços"]
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
        return type.map((item: string) => {
            return <MenuItem value={item}>{item}</MenuItem>
        })
    }

    const handleChange = (event: SelectChangeEvent) => {
        setSelect(event.target.value);

        let classification = {
            size: "",
            buReq: "",
            buBen: "",
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
                classification.buBen = event.target.value;
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
        <div>

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