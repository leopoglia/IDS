import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Services from '../../../../services/workerService';
import { useState, useEffect } from 'react';

export default function FreeSolo(props: any) {

    const [worker, setWorker] = useState([{ workerName: "" }]);

    useEffect(() => {
        getWorker();
    }, []);


    function getWorker() {
        Services.findAll().then((response) => {
            const worker: any = response;
            setWorker(worker);
        });
    }

    const handleChange = (event: any, type: string) => {
        if (type === 'text') {
            props.setWorker(event.target.value);
        } else {
            props.setWorker(event.target.textContent);
        }
    };

    return (
        <div className='select-cost-center'>
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={worker.map((worker) => worker.workerName)}
                    value={props.worker}
                    onChange={(e) => handleChange(e, 'auto')}
                    renderInput={(params) => (
                        <TextField
                            value={props.worker}
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