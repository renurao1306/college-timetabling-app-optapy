import * as React from 'react';
import { useEffect, useState } from 'react';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { useParams } from "react-router-dom";

import axios from 'axios';


let daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
];

function getTimeSlots(ttData) {

    console.log("TSList", ttData.timeslot_list);

    let tsStringSet = new Set();

    // Get days of week from the result (don't make assumptions about
    // the days on which the courses will be held)
    let daysOfWeekSet = new Set();

    for (let i of ttData.timeslot_list) {
        let tsString = i.start_time + " - " + i.end_time;
        // console.log("Adding ts string", tsString);
        tsStringSet.add(tsString);
        daysOfWeekSet.add(i.day_of_week);
    }

    let tsRet = [];
    for (let i of tsStringSet) {
        tsRet.push(i);
    }
    tsRet = tsRet.sort();

    let dowRet = [];
    for (let i of daysOfWeekSet) {
        dowRet.push(i);
    }

    console.log("Returning tsRet", tsRet);
    console.log("Returning dowRet", dowRet);

    return [tsRet, dowRet];
}


function getCourseMap(ttData) {
    let courseMap = {};

    // First, fill up timeslots and daysOfWeek from avaialble
    let [tsList, dowList] = getTimeSlots(ttData);

    for (let tsString of tsList) {
        courseMap[tsString] = {};
        for (let dow of dowList) {
            courseMap[tsString][dow] = [];
        }
    }
    // console.log("\t$$$ after init", courseMap);

    // console.log("$$$ \tGet time slots", getTimeSlots(ttData));

    for (let course of ttData.course_list) {
        // console.log(course.subject, course.timeslot);
        let timeslotString = course.timeslot.start_time + " - " + course.timeslot.end_time;
        console.log(course.subject, timeslotString);

        let dayOfWeek = course.timeslot.day_of_week;

        // console.log("\t###Timeslot string", timeslotString);

        console.log(`...\tPushing ${course.subject} at ${dayOfWeek} ${timeslotString}`);

        if (timeslotString in courseMap) {
            if (dayOfWeek in courseMap[timeslotString]) {
                courseMap[timeslotString][dayOfWeek].push(course);
            }
            else {
                courseMap[timeslotString] = {};
                courseMap[timeslotString][dayOfWeek] = [course];
            }

            console.log(`...\tLength of arr ${courseMap[timeslotString][dayOfWeek].length}`);

        }
        else {
            courseMap[timeslotString] = {};

            courseMap[timeslotString][dayOfWeek] = [course];
        }
    }

    console.log("=== Returning courseMap", courseMap);
    console.log("=== Returning dowList", dowList);
    console.log("===");

    return [courseMap, dowList];
}

function getTTEntries(ttData) {
    console.log("### In getTTEntries");

    let [courseMap, dowList] = getCourseMap(ttData);
    console.log(courseMap, dowList);

    let ttEntries = [];

    for (let ts in courseMap) {
        console.log("ts is", ts);
        let timeslotEntries = [];
        ttEntries.push(timeslotEntries);

        timeslotEntries.push(ts);

        for (let dow in courseMap[ts]) {
            // Take only the first element as there
            // should not be 2 courses in one slot
            // for same student group
            let course = courseMap[ts][dow][0];

            console.log("course is", ts, dow, course);

            let cellString = course
                ?
                <React.Fragment>
                    {course.subject}<br />({course.teacher}, {course.room.name})
                </React.Fragment>
                : "---";

            timeslotEntries.push(cellString);
        }
    }

    console.log("Returning ttEntries", ttEntries);
    console.log("Returning dowList", dowList);

    return [ttEntries, dowList];
}


function useLoadData(apiRoute, setterFn, setIsLoading) {
    useEffect(() => {
        console.log("Getting data from route", apiRoute);

        axios.get(apiRoute, { params: {} }).then((res) => {
            console.log("Got obj list", res.data);
            setterFn(res.data);
            setIsLoading(false);
        });


        // setTimeout(() => {
        //     console.log("Timer fired");
        //     setIsLoading(false);

        // }, 5000);

    }, []);

}


function preventDefault(event) {
    event.preventDefault();
}

export default function ViewTimeTable() {

    let { planRunId } = useParams();
    let [isLoading, setIsLoading] = useState(true);
    let [planRunDetails, setPlanRunDetails] = useState([]);
    let [ttEntries, setTTEntries] = useState([]);
    let [dowList, setDowList] = useState([]);

    function computeTTEntries(planRunDetails) {

        console.log("In computeTTEntries", planRunDetails);
        console.log("In computeTTEntries, result length is", planRunDetails.result.length);
        console.log("In computeTTEntries, result item is", planRunDetails.result[0]);
        console.log("In computeTTEntries, result item output is", planRunDetails.result[0].output);

        let ttEntries = [];
        let dowList = [];

        // Use the result output, if available
        if (planRunDetails.result.length == 0 || !planRunDetails.result[0].output) {
            console.log("Result array / output empty, ignoring...");
        } else {
            [ttEntries, dowList] = getTTEntries(planRunDetails.result[0].output);
        }

        // Finally, set the plan run details and other details
        setPlanRunDetails(planRunDetails);
        setTTEntries(ttEntries);
        setDowList(dowList);

    }

    function renderTTEntries() {

        if (ttEntries.length == 0) {
            return (
                <div>
                    <Title>Timetable for plan run id: {planRunId} {planRunDetails.result[0].comments}</Title>
                    <br />
                    <b>No timetable exists for this plan run. Please run the plan from the Plan Runs screen.</b>

                </div>
            )
        } else {
            return (
                <div>
                    <Title>View Timetable for plan run id {planRunId}, {planRunDetails.result[0].comments}</Title>
                    {/* Result Code: {planRunDetails.result_code}, Comments: {planRunDetails.result[0].comments} */}
                    <hr />
                    Output Score:
                    <br />
                    {planRunDetails.result[0].output.score_str}
                    <hr />
                    {/* Room List:
                    <br />
                    {JSON.stringify(planRunDetails.result[0].output.room_list)}
                    <hr />
                    Course List:
                    <hr />
                    {JSON.stringify(planRunDetails.result[0].output.course_list)}
                    <hr />
                    Timeslot List:
                    <hr />
                    {JSON.stringify(planRunDetails.result[0].output.timeslot_list)}
                    <hr />
                    DOW List:
                    <br />
                    {JSON.stringify(dowList)}
                    <hr />
                    TT Entries:
                    <br />
                    {JSON.stringify(ttEntries)}
                    <br /> */}

                    {/* <hr />
                    <hr /> */}
                    <React.Fragment>
                        <Title>Timetable</Title>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    {/* Leave one blank for the timeslot */}
                                    <TableCell align="center"> Time Slot</TableCell>

                                    {dowList.map((dow, index) => (
                                        <TableCell align="center">{dow}</TableCell>
                                    ))}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ttEntries.map((row, index) => (
                                    <TableRow key={index}>
                                        {row.map((cell, index) => (
                                            <TableCell align='center'>
                                                {/* AB<br/>DEFG */}
                                                {/* {strToDisplay} */}
                                                {cell}
                                            </TableCell>
                                        ))
                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </React.Fragment>



                </div>
            )
        }
    }

    function renderTTEntriesOrig() {

        return (
            <div>
                <Title>View Timetable for plan run id: {planRunId}, {planRunDetails.result[0].comments}</Title>
                <hr/>
                Result Code: {planRunDetails.result_code}, Comments: {planRunDetails.result[0].comments}
                <hr />
                Output Score:
                <br />
                {planRunDetails.result[0].output.score_str}
                <hr />
                Room List:
                <br />
                {JSON.stringify(planRunDetails.result[0].output.room_list)}
                <hr />
                Course List:
                <hr />
                {JSON.stringify(planRunDetails.result[0].output.course_list)}
                <hr />
                Timeslot List:
                <hr />
                {JSON.stringify(planRunDetails.result[0].output.timeslot_list)}
                <hr />
                DOW List:
                <br />
                {JSON.stringify(dowList)}
                <hr />
                TT Entries:
                <br />
                {JSON.stringify(ttEntries)}
                <br />

                <hr />
                <hr />
                <React.Fragment>
                    <Title>Timetable</Title>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {/* Leave one blank for the timeslot */}
                                <TableCell align="center"> Time Slot</TableCell>

                                {dowList.map((dow, index) => (
                                    <TableCell align="center">{dow}</TableCell>
                                ))}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ttEntries.map((row, index) => (
                                <TableRow key={index}>
                                    {row.map((cell, index) => (
                                        <TableCell align='center'>
                                            {/* AB<br/>DEFG */}
                                            {/* {strToDisplay} */}
                                            {cell}
                                        </TableCell>
                                    ))
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </React.Fragment>



            </div>
        )
    }

    // let [ttEntries, dowList] = getTTEntries(result);

    // useLoadData("/welcome", setPlanRunDetails, setIsLoading);
    // useLoadData("/welcome", setPlanRunDetails, setIsLoading);

    useLoadData("/getPlanRunDetails?id=" + planRunId, computeTTEntries, setIsLoading);

    return (
        <div>
            {/* Timetable for Plan Run Id {planRunId} will be displayed here (isLoading = {isLoading ? "true" : "false"}) */}


            <React.Fragment>

                {isLoading
                    ?
                    <div>
                        <Title>View Timetable</Title>
                        Loading...
                    </div>
                    :
                    renderTTEntries()
                }

            </React.Fragment>
        </div>

    );

}