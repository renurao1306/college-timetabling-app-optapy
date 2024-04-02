import * as React from 'react';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

import Title from './Title';

export default function LoadingIndicator() {
    return (
        < React.Fragment >
        <Title>Loading...</Title>
        < Divider />
        <CircularProgress/>
    </React.Fragment>
    )
}