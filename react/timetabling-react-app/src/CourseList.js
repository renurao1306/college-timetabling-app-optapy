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

import { useLoadData, useFormSubmit, handleFormSubmit, resetFormFields, deleteItem } from './utilityFns';

import Title from './Title';
import LoadingIndicator from './LoadingIndicator.js';
// import { useAxiosPost } from './utilityFns';

const courseTypes = [
    { label: 'Classroom', value: 'Classroom' },
    { label: 'Lab', value: 'Lab' },
    { label: 'Canteen', value: 'Canteen' },
];

function preventDefault(event) {
    event.preventDefault();
}


export default function CourseList() {

    const [courseId, setCourseId] = useState();
    const [subject, setSubject] = useState("");
    const [teacher, setTeacher] = useState("");
    const [courseType, setCourseType] = useState("");
    const [courseSlot, setCourseSlot] = useState("");
    const [courseList, setCourseList] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    let resetterFnsObj = [
        { resetterFn: setSubject, resetValue: "" },
        { resetterFn: setTeacher, resetValue: "" },
        { resetterFn: setCourseType, resetValue: "" },
        { resetterFn: setCourseSlot, resetValue: "" },
        { resetterFn: setCourseId, resetValue: null },
        { resetterFn: setIsEditMode, resetValue: false },
    ];

    let submitFormData = {
        id: null, // will be filled in during the click of the button
        isEditMode: isEditMode,
        createRoute: "/createCourse",
        updateRoute: "/updateCourse",
        getListRoute: "/getCourseList",
        deleteRoute: "/deleteCourse",
        newObj: { id: courseId, subject: subject, teacher: teacher, type: courseType, slot: courseSlot, student_group: "MCA Sem1", enabled: 1 },
        setListFn: setCourseList,
        setIsLoadingFn: setIsLoading,
        resetterFnsObj: resetterFnsObj
    };


    // Load data
    useLoadData(submitFormData.getListRoute, submitFormData.setListFn, submitFormData.setIsLoadingFn, null);

    function getDataEntryForm() {
        return (
            <React.Fragment>

                <Title> Course CRUD </Title>

                <Card sx={{ width: "100%" }}>
                    <CardContent>
                        <Box sx={{ width: "auto" }}>
                            <Title>Add / Update a course</Title>

                            <Stack direction="column" spacing={4} sx={{}}>

                                <Stack direction="row" spacing={2} sx={{ display: "flex" }}>

                                    <TextField id="outlined-basic" label="Course Subject" variant="outlined"
                                        onChange={(event) => setSubject(event.target.value)} value={subject}
                                        sx={{ flexGrow: 1 }} />

                                    <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
                                        <InputLabel id="course-type-select-label">Course Type</InputLabel>
                                        <Select
                                            labelId="course-type-select-label"
                                            id="course-type-select"
                                            value={courseType}
                                            label="Course Type"
                                            onChange={(event) => setCourseType(event.target.value)}
                                            
                                        >
                                            {
                                                courseTypes.map((courseType, index) => {
                                                    return <MenuItem value={courseType.value}>{courseType.label}</MenuItem>
                                                })
                                            }

                                        </Select>
                                    </FormControl>

                                    <TextField id="outlined-basic" label="Teacher" variant="outlined"
                                        onChange={(event) => setTeacher(event.target.value)} value={teacher}
                                        sx={{ flexGrow: 1 }} />

                                    <TextField id="outlined-basic" label="Slot" variant="outlined"
                                        onChange={(event) => setCourseSlot(event.target.value)} value={courseSlot}
                                        sx={{ flexGrow: 1 }} />
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" onClick={() => {
                                        handleFormSubmit({ ...submitFormData, id: courseId });
                                    }}
                                        sx={{ minWidth: "13em" }}>

                                        {isEditMode ? "Update Course" : "Add Course"}
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

                        <Title>Courses</Title>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Teacher</TableCell>
                                    <TableCell>Slot</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courseList.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.subject}</TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell>{row.teacher}</TableCell>
                                        <TableCell>{row.slot}</TableCell>
                                        <TableCell>
                                            <EditNoteIcon onClick={() => {
                                                console.log("Edit clicked", index, row.id, row);
                                                resetFormFields([
                                                    { resetterFn: setIsEditMode, resetValue: true },
                                                    { resetterFn: setSubject, resetValue: row.subject },
                                                    { resetterFn: setTeacher, resetValue: row.teacher },
                                                    { resetterFn: setCourseType, resetValue: row.type },
                                                    { resetterFn: setCourseSlot, resetValue: row.slot },
                                                    { resetterFn: setCourseId, resetValue: row.id },

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
