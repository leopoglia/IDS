import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ServicesDemand from '../../../../../services/demandService';

export default function SelectLabels(props: any) {

    const [centerCost, setCenterCost] = useState([{ costCenter: "" }]);
    const url = parseInt(window.location.href.split('/')[5]);

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

}