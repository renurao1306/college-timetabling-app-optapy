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

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

import axios from 'axios';

import Title from './Title';
import LoadingIndicator from './LoadingIndicator.js';

import { useLoadData, useFormSubmit, handleFormSubmit, resetFormFields, deleteItem } from './utilityFns';

function preventDefault(event) {
    event.preventDefault();
}

// Below function needs to be on the backsend side since multiple
// front-ends may invoke at the time before the new course id is commmited
// to database
function computeNewCourseId(fixedSlotList) {
    // Return 1 more than 50000 or the max course id

    console.log("Fixed Slot list is:", fixedSlotList);
    let currMaxId = fixedSlotList.reduce((tempMaxId, fs) => { console.log(tempMaxId, fs.new_course_id); return Math.max(fs.new_course_id, tempMaxId); }, 50000);
    console.log("Got max id", currMaxId);
    console.log("Returning ", currMaxId + 1);
    return currMaxId + 1;

}


export default function FixedSlotList() {

    // For the drop downs in the data entry form
    const [courseList, setCourseList] = useState([]);
    const [courseId, setCourseId] = useState('');

    const [roomList, setRoomList] = useState([]);
    const [roomId, setRoomId] = useState('');

    const [timeslotList, setTimeslotList] = useState([]);
    const [timeslotId, setTimeslotId] = useState('');

    // Below are for fixed slots
    const [fixedSlotList, setFixedSlotList] = useState([]);
    const [fixedSlotId, setFixedSlotId] = useState('');

    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    // isEditMode is not a ref because we want the label of the submit
    // button to change when it changes values. So, it is currently
    // implemented as a state
    // let isEditMode = useRef(false);


    // IMPORTANT NODE: The id for the select fields should be empty string (''), and not null
    let resetterFnsObj = [
        { resetterFn: setIsEditMode, resetValue: false },
        { resetterFn: setCourseId, resetValue: '' },
        { resetterFn: setRoomId, resetValue: '' },
        { resetterFn: setTimeslotId, resetValue: '' },
        { resetterFn: setFixedSlotId, resetValue: null },
    ];

    let submitFormData = {
        id: null, // will be filled in during the click of the button
        isEditMode: isEditMode,
        createRoute: "/createFixedSlot",
        updateRoute: "/updateFixedSlot",
        getListRoute: "/getFixedSlotViewList",
        deleteRoute: "/deleteFixedSlot",
        newObj: { id: fixedSlotId,  enabled: 1 },
        setListFn: setFixedSlotList,
        setIsLoadingFn: setIsLoading,
        resetterFnsObj: resetterFnsObj
    };


    // Load data for the dropdowns
    useLoadData("/getCourseList", setCourseList, null, null);
    useLoadData("/getRoomList", setRoomList, null, null);
    useLoadData("/getTimeslotList", setTimeslotList, null, null);

    // Load data
    useLoadData(submitFormData.getListRoute, submitFormData.setListFn, submitFormData.setIsLoadingFn, null);


    function getDataEntryForm() {
        console.log("Course list is", courseList);
        console.log("Room list is", roomList);
        console.log("Timeslot list is", timeslotList);

        return (
            <React.Fragment>
                <Title> Fixed Slot CRUD </Title>
                <Card sx={{ minWidth: "100%" }}>
                    <CardContent>
                        <Box sx={{ width: "auto" }}>
                            <Title>Add a fixed slot</Title>

                            <Stack direction="column" spacing={4}>

                                <Stack direction="row" spacing={2} sx={{ display: "flex" }}>
                                    <FormControl variant="outlined" sx={{ flexGrow: 1 }} >

                                        <InputLabel id="course-select-label">Course</InputLabel>
                                        <Select
                                            labelId="course-select-label"
                                            id="course-select"
                                            value={courseId}
                                            label="Course"
                                            onChange={(event) => setCourseId(event.target.value)}
                                        >
                                            {
                                                courseList.map((course, index) => {
                                                    console.log("Adding course to select", course.id, course.subject);
                                                    return <MenuItem value={course.id}>{course.subject}</MenuItem> 
                                                })
                                            }

                                        </Select>
                                    </FormControl>


                                    <FormControl variant="outlined" sx={{ flexGrow: 1 }} >

                                        < InputLabel id="room-select-label">Room</InputLabel>
                                        <Select
                                            labelId="room-select-label"
                                            id="room-select"
                                            value={roomId}
                                            label="Room"
                                            onChange={(event) => setRoomId(event.target.value)}
                                        >
                                            {
                                                roomList.map((room, index) => { return <MenuItem value={room.id}>{room.name}</MenuItem> })
                                            }

                                        </Select>
                                    </FormControl>


                                    <FormControl variant="outlined" sx={{ flexGrow: 1 }} >

                                        <InputLabel id="timeslot-select-label">Timeslot</InputLabel>
                                        <Select
                                            labelId="timeslot-select-label"
                                            id="timeslot-select"
                                            value={timeslotId}
                                            label="Timeslot"
                                            onChange={(event) => setTimeslotId(event.target.value)}
                                        >
                                            {
                                                timeslotList.map((ts, index) => { return <MenuItem value={ts.id}>{ts.day_of_week + "   " + ts.start_time + "   " + ts.end_time}</MenuItem> })
                                            }

                                        </Select>
                                    </FormControl>
                                </Stack>

                                <Stack direction="row" spacing={2} >
                                    <Button variant="contained" onClick={() => {
                                        let newCourseId = computeNewCourseId(fixedSlotList);
                                        console.log("Add / Update the following:", courseId, roomId, timeslotId, newCourseId);
                                        let tempFormData = { ...submitFormData };
                                        tempFormData.newObj = { id: fixedSlotId, new_course_id: newCourseId, course_id: courseId, room_id: roomId, timeslot_id: timeslotId, enabled: 1 }
                                        handleFormSubmit({ ...tempFormData });

                                    }}
                                    sx={{minWidth: 250}}
                                    >

                                        {isEditMode ? "Update Fixed Slot" : "Add Fixed Slot"}
                                    </Button>

                                    <Button variant="contained" onClick={() => resetFormFields(resetterFnsObj)}
                                    
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Stack>

                        </Box>
                    </CardContent >
                </Card >
            </React.Fragment >
        );
    }

    function renderList() {

        return (
            <React.Fragment>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>

                        <Title>Fixed Slots</Title>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Course Name</TableCell>
                                    <TableCell>Room</TableCell>
                                    <TableCell>Timeslot</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fixedSlotList.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.subject}</TableCell>
                                        <TableCell>{row.room_name}</TableCell>
                                        <TableCell>{row.day_of_week + "   " + row.start_time + "  -  " + row.end_time}</TableCell>
                                        <TableCell>

                                            <EditNoteIcon onClick={() => {
                                                console.log("Edit clicked", index, row.id, row);
                                                resetFormFields([
                                                    { resetterFn: setIsEditMode, resetValue: true },
                                                    { resetterFn: setFixedSlotId, resetValue: row.id },
                                                    { resetterFn: setCourseId, resetValue: row.course_id },
                                                    { resetterFn: setRoomId, resetValue: row.room_id },
                                                    { resetterFn: setTimeslotId, resetValue: row.timeslot_id },

                                                ]);
                                            }}
                                            />

                                            <DeleteIcon onClick={() => {
                                                console.log("Delete clicked", index, row.id);
                                                console.log("Course, Room, Timeslot ids", row.course_id, row.room_id, row.timeslot_id);
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

    if (isLoading) {
        return (
            <LoadingIndicator />
        );
    } else {

        return (
            < React.Fragment >
                {/* <Title>Fixed Slots CRUD  (Debugging needed)</Title>
                <Divider /> */}

                {getDataEntryForm()}

                < Divider />

                <br />
                <br />
                <br />

                {renderList()}
            </React.Fragment >
        );
    }
}
