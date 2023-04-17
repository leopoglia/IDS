import * as React from 'react';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ServicesDemand from '../../../../../services/demandService';

export default function SelectLabels(props: any) {
    // const [age, setAge] = React.useState('');

    const [status, SetStatus] = React.useState(["Backlog", "BacklogEdit", "BacklogApprove"]);
    const url = parseInt(window.location.href.split('/')[5]);


    const handleChange = (event: any, type: string) => {
        if (type === 'text') {
            props.setStatus(event.target.value);
        } else {
            props.setStatus(event.target.textContent);
        }
    };

    return (
        <div className='select-cost-center'>
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={status.map((status) => status)}
                    value={props.status}
                    onChange={(e) => handleChange(e, 'auto')}
                    renderInput={(params) => (
                        <TextField
                            value={props.status}
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