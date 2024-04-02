import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import axios from 'axios';

import { useHistory } from 'react-router-dom';

// import { useAxiosPost } from './utilityFns';

import Tooltip from '@mui/material/Tooltip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CreateIcon from '@mui/icons-material/Create';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';

import Title from './Title';
import LoadingIndicator from './LoadingIndicator.js';



import { useLoadData, handleFormSubmit, resetFormFields, deleteItem, handleRunPlan } from './utilityFns';

function preventDefault(event) {
    event.preventDefault();
}



export default function PlanRunList() {

    let history = useHistory();

    const [planRunComments, setPlanRunComments] = useState("");
    const [planRunId, setPlanRunId] = useState();
    const [planRunList, setPlanRunList] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    let resetterFnsObj = [
        { resetterFn: setPlanRunComments, resetValue: "" },
        { resetterFn: setPlanRunId, resetValue: null },
        { resetterFn: setIsEditMode, resetValue: false },
    ];

    let submitFormData = {
        id: null, // will be filled in during the click of the button
        isEditMode: isEditMode,
        createRoute: "/createPlanRun",
        updateRoute: "/updatePlanRun",
        getListRoute: "/getPlanRunList",
        deleteRoute: "/deletePlanRun",
        newObj: { id: planRunId, comments: planRunComments, status: "Created" },
        setListFn: setPlanRunList,
        setIsLoadingFn: setIsLoading,
        resetterFnsObj: resetterFnsObj
    };


    // Load data
    useLoadData(submitFormData.getListRoute, submitFormData.setListFn, submitFormData.setIsLoadingFn, null);

    function getDataEntryForm() {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Title>Add a Plan Run</Title>
                        <TextField id="outlined-basic" label="Plan Run Name" variant="outlined" onChange={(event) => setPlanRunComments(event.target.value)} />

                        <br />
                        <Button variant="contained" onClick={() => {
                            handleFormSubmit({ ...submitFormData, id: planRunId });
                        }}
                        >Add Plan Run
                        </Button>

                    </Box>
                </CardContent>
            </Card>

        );
    }

    if (isLoading) {
        return (
            <LoadingIndicator />
        );
    } else {

        return (
            <React.Fragment>
                {getDataEntryForm()}

                <Divider />

                <br />
                <br />
                <br />

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>

                        <Title>Timeslots</Title>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Plan Run Comments</TableCell>
                                    <TableCell>Start Time</TableCell>
                                    <TableCell>End Time</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {planRunList.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.comments}</TableCell>
                                        <TableCell>{row.start_time}</TableCell>
                                        <TableCell>{row.end_time}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit General Run Parameter List">
                                                <EditNoteIcon onClick={() => {
                                                    console.log("PlanRunGeneralParams clicked", index);
                                                    history.push(`/planRunGeneralParamList/${row.id}`);
                                                }} />
                                            </Tooltip>

                                            <Tooltip title="Edit Contraint List">
                                                <CreateIcon onClick={() => {
                                                    console.log("Constraints clicked", index);
                                                    history.push(`/planRunConstraintList/${row.id}`);
                                                }} />
                                            </Tooltip>

                                            <Tooltip title="Run the planner">
                                                <PlayArrowIcon onClick={() => {
                                                    console.log("Play clicked", index, row.id);
                                                    let tempFormData = { ...submitFormData };
                                                    tempFormData.newObj.id = row.id;
                                                    handleRunPlan(submitFormData);

                                                }} />
                                            </Tooltip>

                                            <Tooltip title="View output timetable">
                                                <CalendarViewMonthIcon onClick={() => {
                                                    console.log("View tt clicked", index, row.id);
                                                    history.push(`/viewTimeTable/${row.id}`);
                                                }} />
                                            </Tooltip>

                                            <Tooltip title="Delete plan run">
                                                <DeleteIcon onClick={() => {
                                                    console.log("Delete clicked", index, row.id);
                                                    let tempFormData = { ...submitFormData };
                                                    tempFormData.newObj.id = row.id;
                                                    deleteItem({ ...tempFormData });

                                                }} />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </React.Fragment >


        );
    }
}
