const settings = require('./settings.js');
const dbFns = require('./dbFns.js');
const { generateInputJSON } = require('./generateInputJSON.js');
const { startPlannerProcess } = require('./handlePlannerRun.js');

console.log("Got settings", settings.dbSettings);

async function testDBFns() {

    console.log("Getting room list...");
    let rows = await dbFns.getRoomList();
    console.log("Got results", rows);

    console.log("====");
    console.log("Getting course list...");

    rows = await dbFns.getCourseList();
    console.log("Got results", rows);

    console.log("====");
    console.log("Getting timeslot list...");

    rows = await dbFns.getTimeslotList();
    console.log("Got results", rows);

    console.log("====");
    console.log("Getting fixed slot list...");

    rows = await dbFns.getFixedSlotList();
    console.log("Got results", rows);

    console.log("====");
    console.log("Getting constraint list...");

    rows = await dbFns.getConstraintList();
    console.log("Got results", rows);

    console.log("====");
    console.log("Getting general run params list...");

    rows = await dbFns.getGeneralRunParamsList();
    console.log("Got results", rows);
};  

async function testGenericGet() {
    console.log("Getting entity list for ROOMS")
    let rows = await dbFns.getEntityList('ROOMS');
    console.log("Got results", rows);
    console.log("===")

}

async function testGenerateInputJSON() {
    console.log("Generating input JSON...");

    let inputJSON = await generateInputJSON(1);

    // console.log("Got input JSON as", inputJSON);

    let strRep = JSON.stringify(inputJSON);

    console.log(strRep);
}

async function testHandlePlannerRun() {
    let res = await startPlannerProcess(1);
    console.log("Res", res);

}

async function main() {

    // testDBFns();
    // testGenericGet();
    // testGenerateInputJSON
    testHandlePlannerRun();
}


main();




