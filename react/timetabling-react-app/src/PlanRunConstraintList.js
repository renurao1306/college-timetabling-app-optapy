import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";

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


import Title from './Title';
import LoadingIndicator from './LoadingIndicator.js';

import { useLoadData, useFormSubmit, handleFormSubmit, resetFormFields, deleteItem } from './utilityFns';



function preventDefault(event) {
    event.preventDefault();
}

const allConstraints = [
    { name: "fixed_slot_conflict", description: "A fixed slot course cannot be overridden by a non-fixed course" },
    { name: "fixed_room_conflict", description: "A fixed room course cannot be scheduled in a different room" },
    { name: "room_conflict", description: "A room can accommodate at most one course at the same time" },
    { name: "not_more_than_n_hours_coursework_per_day_conflict", description: "A student should not have more than n hours per course per week" },
    { name: "not_more_than_n_hours_in_college_per_day_conflict", description: "A student should not have a day that will span more than n hours" },
    { name: "teacher_conflict", description: "A teacher can teach at most one course at the same time" },
    { name: "student_group_conflict", description: "A student can attend at most one course at the same time" },
    { name: "room_type_conflict", description: "A course of type lab can only be held in a lab room, and so on" },
    { name: "lab_slots_not_back_to_back_conflict", description: "Lab slots for the same course should be back to back" },
    { name: "teacher_room_stability", description: "A teacher would like to teach a course in the same room" },
    { name: "teacher_time_efficiency", description: "A teacher prefers to teach sequential courses and dislikes gaps between courses" },
    { name: "student_group_subject_variety", description: "A student would like to have different theory subjects in adjacent timeslots" }
];

const consTypes = [
    { label: "hard", value: "hard" },
    { label: "soft", value: "soft" },
];

export default function PlanRunConstraintList() {

    // General Params for which plan run? Get the plan run id from the
    // params sent to this screen
    let { planRunId } = useParams();

    const [consName, setConsName] = useState("");
    const [consDesc, setConsDesc] = useState("");
    const [consType, setConsType] = useState("");
    const [consWeight, setConsWeight] = useState("");
    const [consParams, setConsParams] = useState("");
    const [consId, setConsId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [consList, setConsList] = useState([]);
    const [consNammesInDropDown, setConsNamesInDropDown] = useState([...allConstraints]);



    let filteringFn = (cList) => {
        console.log("Filtering constraint names...", cList);
        let tempConsNamesInDropDown = [...allConstraints];


        // Commenting below for now as it causes issues in the Select during edit mode
        // for (let c of cList) {
        //     console.log("Removing", c.consName);
        //     // remove from the dropdown list
        //     tempConsNamesInDropDown = tempConsNamesInDropDown.filter((cInDropDown) => cInDropDown.name != c.name);

        // }
        // console.log("After filtering, setting the constraintNames in drop down to...", tempConsNamesInDropDown);

        setConsNamesInDropDown(tempConsNamesInDropDown);

        // Finally, call the actual setList function
        setConsList(cList);
    };

    let resetterFnsObj = [
        { resetterFn: setConsName, resetValue: "" },
        { resetterFn: setConsDesc, resetValue: "" },
        { resetterFn: setConsType, resetValue: "" },
        { resetterFn: setConsId, resetValue: null },
        { resetterFn: setConsWeight, resetValue: "" },
        { resetterFn: setConsParams, resetValue: "" },
        { resetterFn: setIsEditMode, resetValue: false },
    ];

    let submitFormData = {
        id: null, // will be filled in during the click of the button
        isEditMode: isEditMode,
        createRoute: "/createConstraint",
        updateRoute: "/updateConstraint",
        getListRoute: "/getConstraintList",
        deleteRoute: "/deleteConstraint",
        newObj: { plan_run_id: planRunId, name: consName, description: consDesc, type: consType, weight: consWeight, params: null, enabled: 1 },
        setListFn: filteringFn,
        setIsLoadingFn: setIsLoading,
        resetterFnsObj: resetterFnsObj
    };

    // Load data
    useLoadData(submitFormData.getListRoute, submitFormData.setListFn, submitFormData.setIsLoadingFn, submitFormData.newObj);

    function getDataEntryForm() {
        return (
            <React.Fragment>

                <Title> Constraint CRUD for plan run id {planRunId}</Title>
                <Card sx={{ width: "100%" }}>

                    <CardContent>
                        <Box sx={{ width: "auto" }}>
                            <Title>Add / edit a constraint for Plan Run Id {planRunId}</Title>

                            <Stack direction="column" spacing={2} sx={{}}>
                                <Stack direction="row" spacing={2} sx={{ display: "flex" }}>


                                    <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
                                        <InputLabel id="cons-name-select-label">Constraint Name</InputLabel>
                                        <Select
                                            labelId="cons-name-select-label"
                                            id="cons-name-select"
                                            value={consName}
                                            label="Constraint Name"
                                            onChange={(event) => {
                                                setConsName(event.target.value);
                                                setConsDesc(allConstraints.filter((c) => c.name == event.target.value)[0].description);
                                            }
                                            }
                                            sx={{ flexGrow: 1 }}
                                        >
                                            {
                                                consNammesInDropDown.map((c, index) => { return <MenuItem value={c.name}>{c.name}</MenuItem> })
                                            }

                                        </Select>
                                    </FormControl>

                                    <TextField disabled id="outlined-basic" label="Constraint Desc" variant="outlined" value={consDesc}
                                        sx={{ flexGrow: 2 }} />
                                </Stack>

                                <Stack direction="row" spacing={2} sx={{ display: "flex" }}>
                                    <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
                                        <InputLabel id="cons-type-select-label">Type</InputLabel>
                                        <Select
                                            labelId="cons-type-select-label"
                                            id="cons-type-select"
                                            value={consType}
                                            label="Type"
                                            onChange={(event) => {
                                                setConsType(event.target.value);
                                            }
                                            }
                                        >
                                            {
                                                consTypes.map((ct, index) => { return <MenuItem value={ct.value}>{ct.label}</MenuItem> })
                                            }

                                        </Select>
                                    </FormControl>


                                    <TextField id="outlined-basic" label="Weight" variant="outlined" onChange={(event) => setConsWeight(event.target.value)} value={consWeight}
                                        sx={{ flexGrow: 1 }} />

                                    <TextField id="outlined-basic" label="Params" variant="outlined" onChange={(event) => setConsParams(event.target.value)} value={consParams}
                                        sx={{ flexGrow: 1 }} />
                                </Stack>


                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" onClick={() => {
                                        let tempFormData = { ...submitFormData };
                                        tempFormData.newObj.id = consId;

                                        // A bit of jugglery required here since the params columnd
                                        // is a JSON type in mySQL
                                        if (consParams) {
                                            tempFormData.newObj.params = consParams;
                                        }

                                        handleFormSubmit({ ...tempFormData });
                                    }}>

                                        {isEditMode ? "Update Constraints" : "Add Constraint"}
                                    </Button>

                                    <Button variant="contained" onClick={() => resetFormFields(resetterFnsObj)}>
                                        Cancel
                                    </Button>
                                </Stack>
                            </Stack>

                        </Box>
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
            <React.Fragment>
                {getDataEntryForm()}

                <Divider />

                <br />
                <br />
                <br />

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>

                        <Title>Constraints</Title>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Desc</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Weight</TableCell>
                                    <TableCell>Params</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {consList.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell>{row.weight}</TableCell>
                                        <TableCell>{row.params ? JSON.stringify(row.params) : ""}</TableCell>
                                        <TableCell>
                                            <EditNoteIcon onClick={() => {
                                                console.log("Edit clicked", index, row.id, row);
                                                resetFormFields([
                                                    { resetterFn: setIsEditMode, resetValue: true },
                                                    { resetterFn: setConsName, resetValue: row.name },
                                                    { resetterFn: setConsDesc, resetValue: row.description },
                                                    { resetterFn: setConsType, resetValue: row.type },
                                                    { resetterFn: setConsWeight, resetValue: row.weight },
                                                    { resetterFn: setConsParams, resetValue: row.params ? JSON.stringify(row.params) : "" },
                                                    { resetterFn: setConsId, resetValue: row.id },
                                                ]);

                                            }}
                                            />
                                            <DeleteIcon onClick={() => {
                                                console.log("Delete clicked", index, row.id)
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
