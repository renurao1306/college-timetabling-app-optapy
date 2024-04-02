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




import axios from 'axios';

import Title from './Title';
import LoadingIndicator from './LoadingIndicator.js';

import { useLoadData, useFormSubmit, handleFormSubmit, resetFormFields, deleteItem } from './utilityFns';



function preventDefault(event) {
    event.preventDefault();
}

const allParams = [
    { paramName: 'runtime_in_secs', paramExternalName: 'Runtime limit in seconds for the planner ' },
    { paramName: 'max_hrs_in_day', paramExternalName: 'Maximum hours that a student group can attend courses in a day' }
];

export default function PlanRunGeneralParamList() {

    // General Params for which plan run? Get the plan run id from the
    // params sent to this screen
    let { planRunId } = useParams();

    // const [roomType, setRoomType] = useState("");
    const [paramName, setParamName] = useState("");
    const [paramExternalName, setParamExternalName] = useState([]);
    const [paramValue, setParamValue] = useState([]);
    const [paramList, setParamList] = useState([]);
    const [paramId, setParamId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paramNames, setParamNames] = useState([...allParams]);


    let filteringFn = (pList) => {
        console.log("Filtering param names...", pList);
        let tempParamNames = [...allParams];

        // Commenting below for now as it causes issues in the Select
        // during edit mode

        // for (let p of pList) {
        //     console.log("Removing", p.param_name);
        //     // remove from the dropdown list
        //     tempParamNames = tempParamNames.filter((pInDropDown) => pInDropDown.paramName != p.param_name);

        // }
        // console.log("After filtering, setting the paramNames to...", tempParamNames);

        setParamNames(tempParamNames);

        // Finally, call the actual setList function
        setParamList(pList);
    };

    let resetterFnsObj = [
        { resetterFn: setParamName, resetValue: "" },
        { resetterFn: setParamExternalName, resetValue: "" },
        { resetterFn: setParamValue, resetValue: "" },
        { resetterFn: setParamId, resetValue: null },
        { resetterFn: setIsEditMode, resetValue: false },
    ];

    let submitFormData = {
        id: null, // will be filled in during the click of the button
        isEditMode: isEditMode,
        createRoute: "/createGeneralRunParam",
        updateRoute: "/updateGeneralRunParam",
        getListRoute: "/getGeneralRunParamList",
        deleteRoute: "/deleteGeneralRunParam",
        newObj: { plan_run_id: planRunId, param_name: paramName, param_external_name: paramExternalName, param_value: paramValue },
        setListFn: filteringFn,
        setIsLoadingFn: setIsLoading,
        resetterFnsObj: resetterFnsObj
    };

    // Load data
    useLoadData(submitFormData.getListRoute, submitFormData.setListFn, submitFormData.setIsLoadingFn, submitFormData.newObj);

    function getDataEntryForm() {
        return (
            <React.Fragment>

            <Title> General Run Parameters CRUD for Plan Run id {planRunId}</Title>
            <Card sx={{ width: "100%" }}>
                <CardContent>
                    <Box sx={{ width: "auto" }}>
                        <Title>Add / Update a general parameter for Plan Run Id {planRunId}</Title>

                        <Stack direction="column" spacing={4} sx={{}}>


                        <Stack direction="row" spacing={2} sx={{display: "flex"}}>


                            <FormControl variant="outlined" sx={{flexGrow: 1}}>

                                <InputLabel id="param-name-select-label">Parameter Name</InputLabel>
                                <Select
                                    labelId="param-name-select-label"
                                    id="param-name-select"
                                    value={paramName}
                                    label="Parameter Name"
                                    onChange={(event) => {
                                        setParamName(event.target.value);
                                        setParamExternalName(allParams.filter((p) => p.paramName == event.target.value)[0].paramExternalName);
                                    }
                                    }
                                >
                                    {
                                        paramNames.map((pt, index) => { return <MenuItem value={pt.paramName}>{pt.paramName}</MenuItem> })
                                    }

                                </Select>
                            </FormControl>

                            <TextField disabled id="outlined-basic" label="Parameter Desc" variant="outlined" onChange={(event) => setParamValue(event.target.value)} value={paramExternalName}
                            sx={{flexGrow: 1}}/>

                            <TextField id="outlined-basic" label="Parameter Value" variant="outlined" onChange={(event) => setParamValue(event.target.value)} value={paramValue}
                            sx={{flexGrow: 1}}/>
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" onClick={() => {
                                let tempFormData = { ...submitFormData };
                                tempFormData.newObj.id = paramId;
                                handleFormSubmit({ ...tempFormData });
                            }}>

                                {isEditMode ? "Update Param" : "Add Param"}
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

                        <Title>General Parameters</Title>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Param Name</TableCell>
                                    <TableCell>Param Desc</TableCell>
                                    <TableCell>Param Value</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paramList.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.param_name}</TableCell>
                                        <TableCell>{row.param_external_name}</TableCell>
                                        <TableCell>{row.param_value}</TableCell>
                                        <TableCell>
                                            <EditNoteIcon onClick={() => {
                                                console.log("Edit clicked", index, row.id, row);
                                                resetFormFields([
                                                    { resetterFn: setIsEditMode, resetValue: true },
                                                    { resetterFn: setParamName, resetValue: row.param_name },
                                                    { resetterFn: setParamExternalName, resetValue: row.param_external_name },
                                                    { resetterFn: setParamId, resetValue: row.id },
                                                    { resetterFn: setParamValue, resetValue: row.param_value },
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
