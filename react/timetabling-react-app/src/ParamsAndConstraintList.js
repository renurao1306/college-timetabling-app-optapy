import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { useParams } from "react-router-dom"; 


export default function ParamsAndConstraintList() {

    let { planRunId } = useParams();

    return (
        <div>
            <b>Currently Unused</b><br/>
        Params and Constraints for {planRunId} will be displayed here
        </div>
        
    );

}