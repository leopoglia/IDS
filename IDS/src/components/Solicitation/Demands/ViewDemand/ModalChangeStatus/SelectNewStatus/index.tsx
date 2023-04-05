import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect(props: any) {
    const [status, setStatus] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
        props.setStatusChange(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={"Backlog"}>Backlog</MenuItem>
                    <MenuItem value={"BacklogEdit"}>Backlog Edit</MenuItem>
                    <MenuItem value={"Assesment"}>Assesment</MenuItem>
                    <MenuItem value={"BusinessCase"}>Business Case</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}