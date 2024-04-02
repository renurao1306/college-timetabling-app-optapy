import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

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

import axios from 'axios';

import Title from './Title';

import { useLoadData, useFormSubmit, handleFormSubmit, resetFormFields, deleteItem } from './utilityFns';


import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';


const roomTypes = [
    { label: 'Classroom', value: 'Classroom' },
    { label: 'Lab', value: 'Lab' },
    { label: 'Canteen', value: 'Canteen' },
];

// const rooms = [
//     { id: 1, name: "CR-47", type: "Classroom" },
//     { id: 2, name: "CL-9", type: "Lab" },
//     { id: 3, name: "Canteen", type: "Canteen" },
//     { id: 4, name: "CR-50", type: "Classroom" },
// ];


function preventDefault(event) {
    event.preventDefault();
}



export default function TestLayout() {

    const [roomType, setRoomType] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomList, setRoomList] = useState([]);
    const [roomId, setRoomId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);


    // isEditMode is not a ref because we want the label of the submit
    // button to change when it changes values. So, it is currently
    // implemented as a state
    // let isEditMode = useRef(false);


    let resetterFnsObj = [
        { resetterFn: setRoomType, resetValue: "" },
        { resetterFn: setRoomName, resetValue: "" },
        { resetterFn: setRoomId, resetValue: null },
        { resetterFn: setIsEditMode, resetValue: false },
    ];

    let submitFormData = {
        id: null, // will be filled in during the click of the button
        isEditMode: isEditMode,
        createRoute: "/createRoom",
        updateRoute: "/updateRoom",
        getListRoute: "/getRoomList",
        deleteRoute: "/deleteRoom",
        newObj: { id: roomId, name: roomName, type: roomType, enabled: 1 },
        setListFn: setRoomList,
        resetterFnsObj: resetterFnsObj
    };


    // Load data
    useLoadData(submitFormData.getListRoute, submitFormData.setListFn);

    function getDataEntryForm() {
        return (
            <React.Fragment>

                <Title> Just a test screen </Title>

                <Card sx={{ width: "100%" }}>
                    <CardContent>
                        <Box sx={{ width: "auto" }}>
                            
                        <Title> Add a room </Title>

                            <Stack direction="column" spacing={4} sx={{}}>

                                <Stack direction="row" spacing={2} sx={{ display: "flex" }}>

                                    <TextField id="outlined-basic" label="Room Name" variant="outlined"
                                        onChange={(event) => setRoomName(event.target.value)} value={roomName}
                                        sx={{ flexGrow: 1 }} />


                                    <FormControl variant="outlined" sx={{ flexGrow: 3 }}>

                                        <InputLabel id="room-type-select-label">Room Type</InputLabel>
                                        <Select
                                            labelId="room-type-select-label"
                                            id="room-type-select"
                                            value={roomType}
                                            label="Room Type"
                                            onChange={(event) => setRoomType(event.target.value)}
                                            sx={{ flexGrow: 3 }}
                                        >
                                            {
                                                roomTypes.map((roomType, index) => { return <MenuItem value={roomType.value}>{roomType.label}</MenuItem> })
                                            }


                                        </Select>
                                    </FormControl>
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" onClick={() => {
                                        handleFormSubmit({ ...submitFormData, id: roomId });
                                    }}>

                                        {isEditMode ? "Update Room" : "Add Room"}
                                    </Button>

                                    <Button variant="contained" onClick={() => resetFormFields(resetterFnsObj)}>
                                        Cancel
                                    </Button>
                                </Stack>

                                { /* Cannot use our hook for submit since it requires parameters */}
                                {/* <Button variant="contained" onClick={useFormSubmit}>Add Room</Button> */}
                            </Stack>

                        </Box>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
    const daysOfWeekList = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
    ];


    function getDataEntryForm2() {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Box

                    >
                        <Title>Add a timeslot</Title>

                        <Stack direction="column" spacing={4} sx={{}}>

                            <Stack direction="row" spacing={2} sx={{ display: "flex" }}>

                                <FormControl variant="outlined" sx={{ flexGrow: 3 }}>
                                    <InputLabel id="demo-simple-select-label">Day Of Week</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Day Of Week"
                                        value=""
                                        sx={{ flexGrow: 3 }}


                                    >
                                        {
                                            daysOfWeekList.map((dow, index) => { return <MenuItem value={dow}>{dow}</MenuItem> })
                                        }

                                    </Select>
                                </FormControl>

                                <TextField id="outlined-basic" label="Start Time" variant="outlined" sx={{ flexShrink: 1 }} />
                                <TextField id="outlined-basic" label="End Time" variant="outlined" sx={{ flexShrink: 1 }} />
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Button variant="contained">

                                    {isEditMode ? "Update Room" : "Add Room"}
                                </Button>

                                <Button variant="contained" >
                                    Cancel
                                </Button>
                            </Stack>
                        </Stack>


                    </Box>
                </CardContent>
            </Card>

        );
    }

    function getDataEntryForm3() {

        let courseList = [
            { id: 1, subject: "OS" },
            { id: 2, subject: "OS-Lab" },
            { id: 3, subject: "DBMS" },
            { id: 4, subject: "DBMS-Lab" },
        ];

        let roomList = [
            { id: 1, name: "CR-47" },
            { id: 2, name: "CL-9" },
        ];

        let timeslotList = [
            { id: 1, day_of_week: "MONDAY", start_time: "09:00", end_time: "10:00" },
            { id: 2, day_of_week: "MONDAY", start_time: "10:00", end_time: "11:00" },
            { id: 3, day_of_week: "TUESDAY", start_time: "09:00", end_time: "10:00" },
        ];


        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Box sx={{ width: "auto" }}>
                        <Title>Add a fixed slot</Title>

                        <Stack direction="column" spacing={4}>
                            <Stack direction="row" spacing={2} sx={{ display: "flex" }}>

                                <FormControl variant="outlined" sx={{ flexGrow: 1 }}>

                                    <InputLabel id="course-select-label">Course</InputLabel>
                                    <Select
                                        labelId="course-select-label"
                                        id="course-select"

                                        label="Course"

                                    >
                                        {
                                            courseList.map((course, index) => { return <MenuItem value={course.id}>{course.subject}</MenuItem> })
                                        }

                                    </Select>
                                </FormControl>


                                <FormControl variant="outlined" sx={{ flexGrow: 1 }}>

                                    <InputLabel id="room-select-label">Room</InputLabel>
                                    <Select
                                        labelId="room-select-label"
                                        id="room-select"
                                        label="Room"
                                    >
                                        {
                                            roomList.map((room, index) => { return <MenuItem value={room.id}>{room.name}</MenuItem> })
                                        }

                                    </Select>
                                </FormControl>


                                <FormControl variant="outlined" sx={{ flexGrow: 1 }}>

                                    <InputLabel id="timeslot-select-label">Timeslot</InputLabel>
                                    <Select
                                        labelId="timeslot-select-label"
                                        id="timeslot-select"
                                        label="Timeslot"
                                    >
                                        {
                                            timeslotList.map((ts, index) => { return <MenuItem value={ts.id}>{ts.day_of_week + "   " + ts.start_time + "   " + ts.end_time}</MenuItem> })
                                        }

                                    </Select>
                                </FormControl>
                            </Stack>


                            <Stack direction="row" spacing={2}>
                                <Button variant="contained"  >

                                    {isEditMode ? "Update Room" : "Add Room"}
                                </Button>

                                <Button variant="contained" >
                                    Cancel
                                </Button>
                            </Stack>
                        </Stack>


                    </Box>
                </CardContent>
            </Card>
        );
    }


    return (
        <React.Fragment>
            {getDataEntryForm()}
            <Divider />
            {getDataEntryForm2()}
            <Divider />
            {getDataEntryForm3()}
        </React.Fragment >


    );
}
