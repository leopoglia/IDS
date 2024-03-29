import { useState, useEffect } from 'react';
import { Autocomplete, Stack, TextField } from '@mui/material';

import Services from '../../../../services/commissionService';

export default function FreeSolo(props: any) {

    const [commission, setCommission] = useState([{ commissionName: "" }]);

    useEffect(() => {
        getWorker();
    }, []);


    function getWorker() {
        Services.findAll().then((response) => {
            const commission: any = response;
            setCommission(commission);
        });
    }

    const handleChange = (event: any, type: string) => {
        if (type === 'text') {
            props.setCommission(event.target.value);
        } else {
            props.setCommission(event.target.textContent);
        }
    };

    return (
        <div className='select-cost-center input'>
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={commission.map((commission) => commission.commissionName)}
                    value={props.commission}
                    onChange={(e: any) => handleChange(e, 'auto')}
                    renderInput={(params: any) => (
                        <TextField
                            value={props.commission}
                            onChange={(e: any) => handleChange(e, 'text')}
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