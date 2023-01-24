import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels(props: any) {
    const [age, setAge] = React.useState('');
    const [type, setType] = React.useState(props.type);

    const size = ["Pequeno", "Médio", "Grande"]
    const buReq = ["WEG 1", "WEG 2", "WEG 3"]
    const buBen = ["WEG 1", "WEG 2", "WEG 3"]
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
        setAge(event.target.value);
    };

    return (
        <div>

            <FormControl sx={{ minWidth: "100%", height: "60px" }}>
                <Select
                    value={age}
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