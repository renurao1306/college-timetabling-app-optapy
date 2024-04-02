const settings = require('./settings');
const dbFns = require('./dbFns');

console.log("Got settings", settings.dbSettings);


async function testCreateRoom() {
    let room = {
        name: "CL-30",
        type: "Lab",
        enabled: 1
    };

    let res = await dbFns.createEntity("ROOMS", room);
    console.log(res);
}

async function testCreateCourse() {
    let course = {
        subject: "DBMS",
        teacher: 'KMT',
        student_group: 'MCA SEM1',
        type: "Classroom",
        slot: 1,
        enabled: 1
    };

    let res = await dbFns.createEntity("COURSES", course);
    console.log(res);
}

async function testUpdateRoom() {
    let room = {
        id: 4,
        name: "CR-100",
        type: "Classroom"
    };


    let res = await dbFns.updateEntity('ROOMS', room, 'id', 2);
    console.log(res);
}


async function testDeleteRoom() {
    let res = await dbFns.deleteEntity('ROOMS', 3, 'id');
    console.log(res);
}

async function testGetRoom() {
    let res = await dbFns.getEntity('ROOMS', 2, 'id');
    console.log(res);
}

async function testCreatePlanRun() {
    let planRun = {
        start_time: "2023-10-19 15:28:24",
        status: 'In Progress',
    };

    let res = await dbFns.createEntity("PLAN_RUNS", planRun);
    console.log(res);   
}

async function testGetPlanRunList() {
    let res = await dbFns.getEntityList("PLAN_RUNS");
    console.log(res);
    return res;
}

async function testUpdatePlanRun() {
    let planRun = {
        id: 1,
        end_time: "2023-10:19 15:33:15",
        status: 'Completed',
        output: '{"course_list": [{"obj1": 10, "obj2": 20}, {"obj1": 30, "obj2": 40}]}'
    };

    let res = await dbFns.updateEntity("PLAN_RUNS", planRun, "id");
    console.log(res);   
}

async function testDeletePlanRun() {

    res = await dbFns.deleteEntity("PLAN_RUNS", 2, 'id');
    console.log(res);
}


async function testUpdateSolutionFromJSON() {
    const fs = require('fs');
    let rawData = fs.readFileSync('./sample_solution.json')

    let jsonData = JSON.parse(rawData);

    // Store this JSON as the output of the plan run
    let planRun = {
        id: 1,
        output: JSON.stringify(jsonData),
        status: "Completed"
    };

    let res = await dbFns.updateEntity("PLAN_RUNS", planRun, "id");
    console.log(res);

    return res;
}

async function testGetOutputFromPlanRun() {

    // Get the output stored, and display it
    // accessing various internal objects
    let res = await dbFns.getEntity("PLAN_RUNS", 1, "id");
    console.log("Got output", res[0]);

    // // Try accessing some members
    console.log(res[0].output.course_list[0].timeslot.start_time);
    console.log(res[0].output.course_list[0].timeslot.end_time);
    console.log("Score String", res[0].output.score_str);

}

async function testGetConstraintWithPlanId() {
    let res = await dbFns.getEntityListMultipleWhere("CONSTRAINTS", [
        {
            columnName: "plan_run_id",
            value: 1
        },
        {
            columnName: "name",
            value: "student_group_conflict"
        }
    ]);
    console.log(res);
}

async function testGetGeneralRunParamsWithPlanId() {
    let [rows] = await dbFns.getEntityListMultipleWhere("GENERAL_RUN_PARAMS", [
        {
            columnName: "plan_run_id",
            value: 1
        }
    ]);
    console.log(rows);
}

async function testGetRoomWithMultipleWhere() {
    let [rows] = await dbFns.getEntityListMultipleWhere("ROOMS", [
        {
            columnName: "id",
            value: 1
        }
    ]);
    console.log("Res rows", rows);
}

async function testUpdateGeneralRunParamsWithPlanId() {
    let generalRunParams = {
        plan_run_id: 1,
        param_name: 'a_param',
        param_value: 1000
    };

    let res = await dbFns.updateEntityMultipleWhere("GENERAL_RUN_PARAMS", generalRunParams, [
        {
            columnName: "plan_run_id",
            value: 1
        },
        {
            columnName: "param_name",
            value: "a_param"
        }
    ]);
    console.log(res);
}


async function testDeleteGeneralRunParamsWithPlanId() {

    let res = await dbFns.deleteEntityMultipleWhere("GENERAL_RUN_PARAMS", [
        {
            columnName: "plan_run_id",
            value: 2
        }
    ]);
    console.log(res);
}

async function main() {
    let res = null;
    // res = await testCreateRoom();
    // res = await testCreateCourse();
    // res = await testUpdateRoom();
    // res = await testDeleteRoom();
    // res = await testGetRoom();

    // res = await testCreatePlanRun();
    // console.log(res);

    // res = await testGetPlanRunList();
    // console.log("Result is", res);
    // console.log(res[0].output.course_list);
    // console.log(res[0].output.course_list[0].obj1);

    // res = await testUpdatePlanRun();
    // console.log(res);
    // res = await testUpdatePlanRun();
    // console.log(res);

    // res = await testDeletePlanRun();
    // console.log(res);

    // res = await testUpdateSolutionFromJSON();
    // res = await testGetOutputFromPlanRun();

    // res = await testGetConstraintWithPlanId();

    // res = await testGetGeneralRunParamsWithPlanId();
    // res = await testGetRoomWithMultipleWhere();
    // res = await testUpdateGeneralRunParamsWithPlanId();
    // res = await testDeleteGeneralRunParamsWithPlanId();

    res = await dbFns.getOverviewCounts();
    console.log("Output in main", res);

}

main();