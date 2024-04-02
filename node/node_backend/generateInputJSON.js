const settings = require('./settings');
const dbFns = require('./dbFns');

async function generateInputJSON(plan_run_id) {

    console.log("Generating input data JSON for plan run id", plan_run_id);

    let inputJSON = {};

    let [timeslotList] = await dbFns.getEntityList("TIMESLOTS");

    inputJSON.domain_data = {};
    let domain_data = inputJSON.domain_data;
    
    domain_data.timeslot_list = timeslotList;

    let [roomList] = await dbFns.getEntityList("ROOMS");
    domain_data.room_list = roomList;

    let [courseList] = await dbFns.getEntityList("COURSES");
    domain_data.course_list = courseList;

    let [fixedSlotList] = await dbFns.getEntityList("FIXED_SLOTS");
    domain_data.fixed_slot_list = fixedSlotList;

    // Now, get the plan_run_params
    inputJSON.plan_run_params = {};
    let plan_run_params = inputJSON.plan_run_params;

    let [rows] = await dbFns.getEntityListMultipleWhere("GENERAL_RUN_PARAMS", [
        {
            columnName: "plan_run_id",
            value: plan_run_id
        }
    ]);
    console.log("Got gp list", rows);

    let generalRunParamsList = rows;

    console.log("General Plan Run Params", generalRunParamsList);

    for (let p of generalRunParamsList) {
        console.log(p.param_name);
        plan_run_params[p.param_name] = p.param_value;
    }

    // Also, add the constraints
    [rows] = await dbFns.getEntityListMultipleWhere("CONSTRAINTS", [
        {
            columnName: "plan_run_id",
            value: plan_run_id
        }
    ]);
        
    plan_run_params.constraints = rows;
    

    return inputJSON;

}

module.exports = {
    generateInputJSON
};