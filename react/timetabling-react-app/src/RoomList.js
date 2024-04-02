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



export default function RoomList() {

    const [roomType, setRoomType] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomList, setRoomList] = useState([]);
    const [roomId, setRoomId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


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
        setIsLoadingFn: setIsLoading,
        resetterFnsObj: resetterFnsObj
    };


    // Load data
    useLoadData(submitFormData.getListRoute, submitFormData.setListFn, submitFormData.setIsLoadingFn, null);

    function getDataEntryForm() {
        return (
            <React.Fragment>

                <Title> Room CRUD </Title>
                <Card sx={{ width: "100%" }}>
                    <CardContent>
                        <Box sx={{ width: "auto" }}>
                            <Title>Add / Update a room</Title>

                            <Stack direction="column" spacing={4} sx={{}}>

                                <Stack direction="row" spacing={2} sx={{ display: "flex" }}>
                                    <TextField id="outlined-basic" label="Room Name"
                                        variant="outlined"
                                        onChange={(event) => setRoomName(event.target.value)}
                                        value={roomName}
                                        sx={{ flexGrow: 1 }}
                                    />


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

                function renderList() {

        return (
                <React.Fragment>

                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>

                            <Title>Rooms</Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Room Name</TableCell>
                                        <TableCell>Room Type</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {roomList.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>
                                                <EditNoteIcon onClick={() => {
                                                    console.log("Edit clicked", index, row.id, row);
                                                    resetFormFields([
                                                        { resetterFn: setIsEditMode, resetValue: true },
                                                        { resetterFn: setRoomName, resetValue: row.name },
                                                        { resetterFn: setRoomType, resetValue: row.type },
                                                        { resetterFn: setRoomId, resetValue: row.id },

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

                if (isLoading) {
        return (
                <LoadingIndicator />
                );
    } else {

        return (
                < React.Fragment >
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
