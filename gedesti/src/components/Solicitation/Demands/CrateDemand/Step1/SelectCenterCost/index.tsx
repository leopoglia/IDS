import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Services from '../../../../../../services/costCenterService';
import { useState, useEffect } from 'react';

export default function FreeSolo(props: any) {

    const [centerCost, setCenterCost] = useState([{ costCenter: "" }]);

    useEffect(() => {
        getBu();
    }, []);


    function getBu() {
        Services.findAll().then((response) => {
            const bu: any = response;
            console.log("bu->", bu)
            setCenterCost(bu);
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
        </div>
    );
}
