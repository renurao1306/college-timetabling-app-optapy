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
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

import axios from 'axios';

import Title from './Title';
import LoadingIndicator from './LoadingIndicator.js';

import { useLoadData, useFormSubmit, handleFormSubmit, resetFormFields, deleteItem } from './utilityFns';
import { generateTimeLabels } from './timeLabels.js';

const daysOfWeekList = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
];

const startTimeLabels = generateTimeLabels('08:00:00', "17:00:00", 1, 'hour');
const endTimeLabels = generateTimeLabels('09:00:00', "18:00:00", 1, 'hour');

// const startTimes = generateTimeItems("09:00:00", "16:00:00");

function preventDefault(event) {
    event.preventDefault();
}


export default function RoomList() {

    const [timeslotId, setTimeslotId] = useState();
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [timeslotList, setTimeslotList] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    let resetterFnsObj = [
        { resetterFn: setStartTime, resetValue: "" },
        { resetterFn: setEndTime, resetValue: "" },
        { resetterFn: setDayOfWeek, resetValue: "" },
        { resetterFn: setTimeslotId, resetValue: null },
        { resetterFn: setIsEditMode, resetValue: false },
    ];

    let submitFormData = {
        id: null, // will be filled in during the click of the button
        isEditMode: isEditMode,
        createRoute: "/createTimeslot",
        updateRoute: "/updateTimeslot",
        getListRoute: "/getTimeslotList",
        deleteRoute: "/deleteTimeslot",
        newObj: { id: timeslotId, start_time: startTime, end_time: endTime, day_of_week: dayOfWeek, enabled: 1 },
        setListFn: setTimeslotList,
        setIsLoadingFn: setIsLoading,
        resetterFnsObj: resetterFnsObj
    };



    // Load data
    useLoadData(submitFormData.getListRoute, submitFormData.setListFn, submitFormData.setIsLoadingFn, submitFormData.newObj);

    function getDataEntryForm() {
        return (
            <React.Fragment>

                <Title> Timeslot CRUD </Title>
                <Card sx={{ width: "100%" }}>
                    <CardContent>
                        <Box

                        >
                            <Title>Add / Update a timeslot</Title>

                            <Stack direction="column" spacing={4} sx={{}}>

                                <Stack direction="row" spacing={2} sx={{ display: "flex" }}>


                                    <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
                                        <InputLabel id="demo-simple-select-label">Day Of Week</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={dayOfWeek}
                                            label="Day Of Week"
                                            onChange={(event) => setDayOfWeek(event.target.value)}
                                        >
                                            {
                                                daysOfWeekList.map((dow, index) => { return <MenuItem value={dow}>{dow}</MenuItem> })
                                            }

                                        </Select>
                                    </FormControl>

                                    <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
                                        <InputLabel id="start-time-select-label">Start Time</InputLabel>
                                        <Select
                                            labelId="start-time-select-label"
                                            id="start-time-select"
                                            value={startTime}
                                            label="Start Time"
                                            onChange={(event) => setStartTime(event.target.value)}
                                        >
                                            {
                                                startTimeLabels.map((tl, index) => { return <MenuItem value={tl}>{tl}</MenuItem> })
                                            }

                                        </Select>
                                    </FormControl>

                                    <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
                                        <InputLabel id="end-time-select-label">End Time</InputLabel>
                                        <Select
                                            labelId="end-time-select-label"
                                            id="end-time-select"
                                            value={endTime}
                                            label="End Time"
                                            onChange={(event) => setEndTime(event.target.value)}
                                        >
                                            {
                                                endTimeLabels.map((tl, index) => { return <MenuItem value={tl}>{tl}</MenuItem> })
                                            }

                                        </Select>
                                    </FormControl>

                                    {/* Using Select fields instead of TextField */}
                                    {/* 
                                    <TextField id="outlined-basic" label="Start Time" variant="outlined"
                                        onChange={(event) => setStartTime(event.target.value)} value={startTime}
                                        sx={{ flexGrow: 1 }} />
                                    <TextField id="outlined-basic" label="End Time" variant="outlined"
                                        onChange={(event) => setEndTime(event.target.value)} value={endTime}
                                        sx={{ flexGrow: 1 }} /> */}
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" onClick={() => {
                                        handleFormSubmit({ ...submitFormData, id: timeslotId });
                                    }}>

                                        {isEditMode ? "Update Timeslot" : "Add Timeslot"}
                                    </Button>

                                    <Button variant="contained" onClick={() => resetFormFields(resetterFnsObj)}>
                                        Cancel
                                    </Button>
                                </Stack>
                            </Stack>

                        </Box>
                    </CardContent>
                </Card>
            </React.Fragment>
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
                                    <TableCell>Day of Week</TableCell>
                                    <TableCell>Start Time</TableCell>
                                    <TableCell>End Time</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {timeslotList.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.day_of_week}</TableCell>
                                        <TableCell>{row.start_time}</TableCell>
                                        <TableCell>{row.end_time}</TableCell>
                                        <TableCell>
                                            <EditNoteIcon onClick={() => {
                                                console.log("Edit clicked", index, row.id, row);
                                                resetFormFields([
                                                    { resetterFn: setIsEditMode, resetValue: true },
                                                    { resetterFn: setStartTime, resetValue: row.start_time },
                                                    { resetterFn: setEndTime, resetValue: row.end_time },
                                                    { resetterFn: setDayOfWeek, resetValue: row.day_of_week },
                                                    { resetterFn: setTimeslotId, resetValue: row.id },

                                                ]);

                                            }}
                                            />
                                            <DeleteIcon onClick={() => {
                                                console.log("Delete clicked", index, row.id);
                                                let tempFormData = { ...submitFormData };
                                                tempFormData.newObj.id = row.id;
                                                deleteItem({ ...tempFormData });
                                            }}
                                            />


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
