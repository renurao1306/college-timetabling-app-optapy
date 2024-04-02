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

let result = JSON.parse('{"timeslot_list": [{"id": 2, "day_of_week": "MONDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, {"id": 3, "day_of_week": "MONDAY", "start_time": "11:00:00", "end_time": "12:00:00"}, {"id": 4, "day_of_week": "MONDAY", "start_time": "12:00:00", "end_time": "13:00:00"}, {"id": 50001, "day_of_week": "MONDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, {"id": 5, "day_of_week": "MONDAY", "start_time": "14:00:00", "end_time": "15:00:00"}, {"id": 6, "day_of_week": "MONDAY", "start_time": "15:00:00", "end_time": "16:00:00"}, {"id": 7, "day_of_week": "MONDAY", "start_time": "16:00:00", "end_time": "17:00:00"}, {"id": 8, "day_of_week": "TUESDAY", "start_time": "09:00:00", "end_time": "10:00:00"}, {"id": 9, "day_of_week": "TUESDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, {"id": 10, "day_of_week": "TUESDAY", "start_time": "11:00:00", "end_time": "12:00:00"}, {"id": 11, "day_of_week": "TUESDAY", "start_time": "12:00:00", "end_time": "13:00:00"}, {"id": 50002, "day_of_week": "TUESDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, {"id": 12, "day_of_week": "TUESDAY", "start_time": "14:00:00", "end_time": "15:00:00"}, {"id": 13, "day_of_week": "TUESDAY", "start_time": "15:00:00", "end_time": "16:00:00"}, {"id": 14, "day_of_week": "TUESDAY", "start_time": "16:00:00", "end_time": "17:00:00"}, {"id": 16, "day_of_week": "WEDNESDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, {"id": 17, "day_of_week": "WEDNESDAY", "start_time": "11:00:00", "end_time": "12:00:00"}, {"id": 18, "day_of_week": "WEDNESDAY", "start_time": "12:00:00", "end_time": "13:00:00"}, {"id": 50003, "day_of_week": "WEDNESDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, {"id": 19, "day_of_week": "WEDNESDAY", "start_time": "14:00:00", "end_time": "15:00:00"}, {"id": 20, "day_of_week": "WEDNESDAY", "start_time": "15:00:00", "end_time": "16:00:00"}, {"id": 21, "day_of_week": "WEDNESDAY", "start_time": "16:00:00", "end_time": "17:00:00"}, {"id": 23, "day_of_week": "THURSDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, {"id": 24, "day_of_week": "THURSDAY", "start_time": "11:00:00", "end_time": "12:00:00"}, {"id": 25, "day_of_week": "THURSDAY", "start_time": "12:00:00", "end_time": "13:00:00"}, {"id": 50004, "day_of_week": "THURSDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, {"id": 26, "day_of_week": "THURSDAY", "start_time": "14:00:00", "end_time": "15:00:00"}, {"id": 27, "day_of_week": "THURSDAY", "start_time": "15:00:00", "end_time": "16:00:00"}, {"id": 28, "day_of_week": "THURSDAY", "start_time": "16:00:00", "end_time": "17:00:00"}, {"id": 29, "day_of_week": "FRIDAY", "start_time": "09:00:00", "end_time": "10:00:00"}, {"id": 30, "day_of_week": "FRIDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, {"id": 31, "day_of_week": "FRIDAY", "start_time": "11:00:00", "end_time": "12:00:00"}, {"id": 32, "day_of_week": "FRIDAY", "start_time": "12:00:00", "end_time": "13:00:00"}, {"id": 50005, "day_of_week": "FRIDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, {"id": 33, "day_of_week": "FRIDAY", "start_time": "14:00:00", "end_time": "15:00:00"}, {"id": 36, "day_of_week": "SATURDAY", "start_time": "09:00:00", "end_time": "10:00:00"}, {"id": 37, "day_of_week": "SATURDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, {"id": 38, "day_of_week": "SATURDAY", "start_time": "11:00:00", "end_time": "12:00:00"}, {"id": 39, "day_of_week": "SATURDAY", "start_time": "12:00:00", "end_time": "13:00:00"}, {"id": 50006, "day_of_week": "SATURDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, {"id": 40, "day_of_week": "SATURDAY", "start_time": "14:00:00", "end_time": "15:00:00"}], "room_list": [{"id": 1, "name": "CR-47", "type": "Classroom"}, {"id": 2, "name": "CL-9", "type": "Lab"}, {"id": 3, "name": "CL-17", "type": "Lab"}, {"id": 4, "name": "CL-19", "type": "Lab"}, {"id": 5, "name": "CL-21", "type": "Lab"}, {"id": 6, "name": "CL-13", "type": "Lab"}, {"id": 7, "name": "CL-5", "type": "Lab"}, {"id": 8, "name": "CL-6", "type": "Lab"}, {"id": 9, "name": "CR-48", "type": "Classroom"}, {"id": 10, "name": "CR-49", "type": "Classroom"}, {"id": 11, "name": "CR-50", "type": "Classroom"}, {"id": 50000, "name": "Canteen", "type": "Canteen"}], "course_list": [{"id": 1, "subject": "OS", "teacher": "SFA", "type": "Classroom", "student_group": "MCA Sem1", "timeslot": {"id": 2, "day_of_week": "MONDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, "room": {"id": 1, "name": "CR-47", "type": "Classroom"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 2, "subject": "OS-Lab", "teacher": "SFA-Lab", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 3, "day_of_week": "MONDAY", "start_time": "11:00:00", "end_time": "12:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 200, "subject": "OS-Lab", "teacher": "SFA-Lab", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 4, "day_of_week": "MONDAY", "start_time": "12:00:00", "end_time": "13:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 2, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 3, "subject": "DBMS", "teacher": "KMT", "type": "Classroom", "student_group": "MCA Sem1", "timeslot": {"id": 5, "day_of_week": "MONDAY", "start_time": "14:00:00", "end_time": "15:00:00"}, "room": {"id": 1, "name": "CR-47", "type": "Classroom"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 4, "subject": "DBMS-Lab", "teacher": "KMT-Lab", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 8, "day_of_week": "TUESDAY", "start_time": "09:00:00", "end_time": "10:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 400, "subject": "DBMS-Lab", "teacher": "KMT-Lab", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 9, "day_of_week": "TUESDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 2, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 5, "subject": "CN", "teacher": "ISA", "type": "Classroom", "student_group": "MCA Sem1", "timeslot": {"id": 10, "day_of_week": "TUESDAY", "start_time": "11:00:00", "end_time": "12:00:00"}, "room": {"id": 1, "name": "CR-47", "type": "Classroom"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 6, "subject": "CN-Lab", "teacher": "ISA-Lab", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 11, "day_of_week": "TUESDAY", "start_time": "12:00:00", "end_time": "13:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 600, "subject": "CN-Lab", "teacher": "ISA-Lab", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 16, "day_of_week": "WEDNESDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 2, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 7, "subject": "DSA", "teacher": "PSH", "type": "Classroom", "student_group": "MCA Sem1", "timeslot": {"id": 17, "day_of_week": "WEDNESDAY", "start_time": "11:00:00", "end_time": "12:00:00"}, "room": {"id": 1, "name": "CR-47", "type": "Classroom"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 8, "subject": "DSA-Lab", "teacher": "PSH-Lab", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 18, "day_of_week": "WEDNESDAY", "start_time": "12:00:00", "end_time": "13:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 800, "subject": "DSA-Lab", "teacher": "PSH-Lab", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 19, "day_of_week": "WEDNESDAY", "start_time": "14:00:00", "end_time": "15:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 2, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 9, "subject": "JP", "teacher": "HM", "type": "Classroom", "student_group": "MCA Sem1", "timeslot": {"id": 23, "day_of_week": "THURSDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, "room": {"id": 1, "name": "CR-47", "type": "Classroom"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 900, "subject": "JP", "teacher": "HM", "type": "Classroom", "student_group": "MCA Sem1", "timeslot": {"id": 24, "day_of_week": "THURSDAY", "start_time": "11:00:00", "end_time": "12:00:00"}, "room": {"id": 1, "name": "CR-47", "type": "Classroom"}, "slot": 2, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 901, "subject": "JP", "teacher": "HM", "type": "Classroom", "student_group": "MCA Sem1", "timeslot": {"id": 25, "day_of_week": "THURSDAY", "start_time": "12:00:00", "end_time": "13:00:00"}, "room": {"id": 1, "name": "CR-47", "type": "Classroom"}, "slot": 3, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 10, "subject": "JP-Lab", "teacher": "HM-Lab", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 26, "day_of_week": "THURSDAY", "start_time": "14:00:00", "end_time": "15:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 1000, "subject": "JP-Lab", "teacher": "HM-Lab", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 29, "day_of_week": "FRIDAY", "start_time": "09:00:00", "end_time": "10:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 2, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 11, "subject": "WT", "teacher": "ASI", "type": "Classroom", "student_group": "MCA Sem1", "timeslot": {"id": 30, "day_of_week": "FRIDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, "room": {"id": 1, "name": "CR-47", "type": "Classroom"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 12, "subject": "WT-Lab", "teacher": "ASI-Lab", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 31, "day_of_week": "FRIDAY", "start_time": "11:00:00", "end_time": "12:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 1200, "subject": "WT-Lab", "teacher": "ASI-Lab", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 32, "day_of_week": "FRIDAY", "start_time": "12:00:00", "end_time": "13:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 2, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 13, "subject": "EC", "teacher": "SSI", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 36, "day_of_week": "SATURDAY", "start_time": "09:00:00", "end_time": "10:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 14, "subject": "DT", "teacher": "MST", "type": "Classroom", "student_group": "MCA Sem1", "timeslot": {"id": 37, "day_of_week": "SATURDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, "room": {"id": 1, "name": "CR-47", "type": "Classroom"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 1400, "subject": "DT", "teacher": "MST", "type": "Classroom", "student_group": "MCA Sem1", "timeslot": {"id": 38, "day_of_week": "SATURDAY", "start_time": "11:00:00", "end_time": "12:00:00"}, "room": {"id": 1, "name": "CR-47", "type": "Classroom"}, "slot": 2, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 15, "subject": "DT-Lab", "teacher": "MST", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 39, "day_of_week": "SATURDAY", "start_time": "12:00:00", "end_time": "13:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 1, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 1500, "subject": "DT-Lab", "teacher": "MST", "type": "Lab", "student_group": "MCA Sem1", "timeslot": {"id": 2, "day_of_week": "MONDAY", "start_time": "10:00:00", "end_time": "11:00:00"}, "room": {"id": 2, "name": "CL-9", "type": "Lab"}, "slot": 2, "fixed": 0, "fixed_timeslot": null, "fixed_room": null}, {"id": 50001, "subject": "Lunch Break", "teacher": "Chefs", "type": "Canteen", "student_group": "MCA Sem1", "timeslot": {"id": 50001, "day_of_week": "MONDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, "room": {"id": 50000, "name": "Canteen", "type": "Canteen"}, "slot": 1, "fixed": 1, "fixed_timeslot": {"id": 50001, "day_of_week": "MONDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, "fixed_room": {"id": 50000, "name": "Canteen", "type": "Canteen"}}, {"id": 50002, "subject": "Lunch Break", "teacher": "Chefs", "type": "Canteen", "student_group": "MCA Sem1", "timeslot": {"id": 50002, "day_of_week": "TUESDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, "room": {"id": 50000, "name": "Canteen", "type": "Canteen"}, "slot": 1, "fixed": 1, "fixed_timeslot": {"id": 50002, "day_of_week": "TUESDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, "fixed_room": {"id": 50000, "name": "Canteen", "type": "Canteen"}}, {"id": 50003, "subject": "Lunch Break", "teacher": "Chefs", "type": "Canteen", "student_group": "MCA Sem1", "timeslot": {"id": 50003, "day_of_week": "WEDNESDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, "room": {"id": 50000, "name": "Canteen", "type": "Canteen"}, "slot": 1, "fixed": 1, "fixed_timeslot": {"id": 50003, "day_of_week": "WEDNESDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, "fixed_room": {"id": 50000, "name": "Canteen", "type": "Canteen"}}, {"id": 50004, "subject": "Lunch Break", "teacher": "Chefs", "type": "Canteen", "student_group": "MCA Sem1", "timeslot": {"id": 50004, "day_of_week": "THURSDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, "room": {"id": 50000, "name": "Canteen", "type": "Canteen"}, "slot": 1, "fixed": 1, "fixed_timeslot": {"id": 50004, "day_of_week": "THURSDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, "fixed_room": {"id": 50000, "name": "Canteen", "type": "Canteen"}}, {"id": 50005, "subject": "Lunch Break", "teacher": "Chefs", "type": "Canteen", "student_group": "MCA Sem1", "timeslot": {"id": 50005, "day_of_week": "FRIDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, "room": {"id": 50000, "name": "Canteen", "type": "Canteen"}, "slot": 1, "fixed": 1, "fixed_timeslot": {"id": 50005, "day_of_week": "FRIDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, "fixed_room": {"id": 50000, "name": "Canteen", "type": "Canteen"}}, {"id": 50006, "subject": "Lunch Break", "teacher": "Chefs", "type": "Canteen", "student_group": "MCA Sem1", "timeslot": {"id": 50006, "day_of_week": "SATURDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, "room": {"id": 50000, "name": "Canteen", "type": "Canteen"}, "slot": 1, "fixed": 1, "fixed_timeslot": {"id": 50006, "day_of_week": "SATURDAY", "start_time": "13:00:00", "end_time": "14:00:00"}, "fixed_room": {"id": 50000, "name": "Canteen", "type": "Canteen"}}], "score": {}, "score_str": "-64hard/0soft", "_optapy_solver_run_id": [139692192606848, 139692192815920, {"hex": "14275fc06f2c11ee95ecac2b6e9a3080"}]}');

let daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
];

function getTimeSlots(result) {
    // console.log("TSList", result.timeslot_list);
    let tsStringSet = new Set();

    // Get days of week from the result (don't make assumptions about
    // the days on which the courses will be held)
    let daysOfWeekSet = new Set();

    for (let i of result.timeslot_list) {
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



    // console.log("Returning tsSet", tsRet);

    return [tsRet, dowRet];
}


function getCourseMap(result) {
    let courseMap = {};

    // First, fill up timeslots and daysOfWeek from avaialble
    let [tsList, dowList] = getTimeSlots(result);

    for (let tsString of tsList) {
        courseMap[tsString] = {};
        for (let dow of dowList) {
            courseMap[tsString][dow] = [];
        }
    }
    // console.log("\t$$$ after init", courseMap);

    // console.log("$$$ \tGet time slots", getTimeSlots(result));

    for (let course of result.course_list) {
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
    console.log("===");


    return [courseMap, dowList];
}

function getTTEntries(setTTEntries) {
    console.log("### In getTTEntries");

    let [courseMap, dowList] = getCourseMap(result);
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

    console.log(ttEntries);

    // setTTEntries(ttEntries);

    return [ttEntries, dowList];
    // return dowList;
}


function useLoadData(apiRoute, setterFn, setIsLoading) {
    useEffect(() => {
        console.log("Getting data from route", apiRoute);

        // axios.get(apiRoute).then((res) => {
        //     console.log("Got list", res.data);
        //     setterFn(res.data.result);
        // });

        setTimeout(() => {
            console.log("Timer fired");
            setIsLoading(false);

        }, 5000);

    }, []);

}


function preventDefault(event) {
    event.preventDefault();
}

export default function ViewTimeTable() {

    let { planRunId } = useParams();
    let [isLoading, setIsLoading] = useState(true);
    let [ planRunDetails, setPlanRunDetails ] = useState({});
   
    let [ ttEntries, dowList ] = getTTEntries(result);

    // useLoadData("/welcome", setPlanRunDetails, setIsLoading);



    return (
        <div>
            Timetable for Plan Run Id {planRunId} { /* will  (isLoading = {isLoading ? "true" : "false"})*/}
            <React.Fragment>
                <Title>Plan Runs</Title>
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

    );

}