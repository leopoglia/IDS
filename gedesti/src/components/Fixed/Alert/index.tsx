import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import "./style.css"

export default function BasicAlerts(props: any) {

    return (
        <div className='alert-fixed'>
            <Alert severity={props.type}>{props.text}</Alert>
        </div>
    );
}