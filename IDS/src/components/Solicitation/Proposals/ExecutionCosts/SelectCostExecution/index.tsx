import * as React from 'react';
import { useState, useEffect } from 'react';
import Services from '../../../../../services/costCenterService';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ServicesDemand from '../../../../../services/demandService';

export default function SelectLabels(props: any) {
    // const [age, setAge] = React.useState('');

    const [centerCost, setCenterCost] = React.useState([{ costCenter: "" }]);
    const url = parseInt(window.location.href.split('/')[5]);
    // const [select, setSelect] = React.useState('');

    const [bu, setBu] = useState([{ costCenter: "" }]);


    useEffect(() => {
        getBu();
    }, []);


    function getBu() {

        ServicesDemand.findById(url).then((response: any) => {

            let bus = [{ costCenter: ""}];

            for (let i = 0; i < response.costCenter.length; i++) {
                bus.push({ costCenter: response.costCenter[i].costCenter });
            }
            setCenterCost(bus);
        });
    }

    const handleChange = (event: any, type: string) => {
        if (type === 'text') {
            props.setCostCenter(event.target.value);
        } else {
            props.setCostCenter(event.target.textContent);
        }
    };

    // const handleChange = (event: SelectChangeEvent) => {
    //     if (props.type === "payingCostCenter") {
    //         props.setPayingCostCenter(event.target.value);
    //         setSelect(event.target.value)
    //     }
    // };

    return (
        <div className='select-cost-center'>
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={centerCost.map((centerCost) => centerCost.costCenter)}
                    value={props.CostCenter}
                    onChange={(e) => handleChange(e, 'auto')}
                    renderInput={(params) => (
                        <TextField
                            value={props.CostCenter}
                            onChange={(e) => handleChange(e, 'text')}
                            {...params}
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
            </Stack>
        </div>);

    // {/* <FormControl sx={{ width: "100%" }}>
    //     <Select
    //         value={select}
    //         onChange={handleChange}
    //         displayEmpty
    //         inputProps={{ 'aria-label': 'Without label' }}

    //         sx={{ minWidth: '100%', height: '45px' }}
    //     >
    //         {props.type === "payingCostCenter" ? <MenuItem value={"Centro Custo 1"}>Centro Custo 1</MenuItem>
    //             : null}
    //         {props.type === "payingCostCenter" ? <MenuItem value={"Centro Custo 2"}>Centro Custo 2</MenuItem>
    //             : null}
    //         {props.type === "payingCostCenter" ? <MenuItem value={"Centro Custo 3"}>Centro Custo 3</MenuItem>
    //             : null}
    //     </Select>
    // </FormControl> */}

}