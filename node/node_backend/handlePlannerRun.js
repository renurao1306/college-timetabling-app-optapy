const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const dayjs = require('dayjs');

const settings = require('./settings');
const dbFns = require('./dbFns');
const { generateInputJSON } = require('./generateInputJSON');

let plannerSettings = settings.plannerSettings;

async function startPlannerProcess(plan_run_id, io, isDryRun) {

    console.log("In startPlannerProcess for", plan_run_id, ", dry run is", isDryRun);

    // Update the status, output of the plan run id
    res = await updatePlanRunDetails(plan_run_id, isDryRun ? "Dry run in progress" : 'In Progreess', null);
    console.log("Updated DB", res);
    

    // Generate the input data for the planner from the data in the
    // tables
    let inputDataJSON = await generateInputJSON(plan_run_id);

    
    let strRep = JSON.stringify(inputDataJSON);

    // Write the string representation to a file in the specified directory
    // let outFilePath = `${plannerSettings.inputDataGenerationFileDir}/plan_run_${[plan_run_id]}.json`; 
    let outFilePath = `${plannerSettings.inputDataGenerationFileDir}${path.sep}plan_run_${[plan_run_id]}.json`; 

    console.log("Writing file to", outFilePath);

    fs.writeFileSync(outFilePath, strRep);

    // If isDryRun, then return after generating the JSON file
    if (isDryRun) {
        console.log("Returning without starting the planner process since isDryRun is", isDryRun);
        // Update the status, output of the plan run id
        res = await updatePlanRunDetails(plan_run_id, "Dry run Completed", null);
        console.log("Updated DB", res);

        return;
    }


    // Form the command line
    let cmdLine = `"${plannerSettings.python3Path}" "${plannerSettings.mainPyPath}" "${outFilePath}" json`;

    // Start the planner process
    spawnProcess(cmdLine).then(async (res) => {
        console.log("### Process finished with res", res);
        let outJson = await getSolutionJSON(res);
    
        console.log("Out Json is", outJson);
    
        // Try accessing some members
        console.log("Course 0 timeslot", 
          outJson.course_list[0].timeslot.day_of_week,
          outJson.course_list[0].timeslot.start_time,
          outJson.course_list[0].timeslot.end_time);
    
        console.log("Score of the solution", outJson.score_str);

        // Update the status, output of the plan run id
        res = await updatePlanRunDetails(plan_run_id, 'Completed', outJson);
        console.log("Updated DB", res);

        // Notify interested clients through web socket
        io.emit(settings.webSocketRoom, {
            plan_run_id: plan_run_id,
            result: "Completed",
            end_time: dayjs().format("YYYY-MM-DD HH:mm:ss")})
      });
    
}

async function getSolutionJSON(output)
{
  console.log("***************Finding in", output.length);

  // Find the beginning string
  let startIndex = output.indexOf("### JSON SOLUTION BEGINS ###");
  let endIndex = output.indexOf("### JSON SOLUTION ENDS ###");

  // +26 from start to skip over the start token line
  // console.log(startIndex + 28, endIndex);
  let ret = JSON.parse(output.slice(startIndex+28, endIndex));
  // console.log(ret);
  return ret;
}

async function spawnProcess(cmdLine) {

    console.log("Trying to execute", cmdLine);

    return new Promise((resolve, reject) => {
        let execRet = exec(cmdLine, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error}`)
            }
            if (stdout) {
                console.log(`stdout: ${stdout}`)
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`)
            }

            if (stdout) {
                resolve(stdout);
            } else {
                reject(stderr);
            }
        });
        // console.log("Child pid", execRet.child.pid);
    });
}

async function updatePlanRunDetails(plan_run_id, status, output) {

    console.log("### In updatePlabRunDetails", status, output);


    let planRunDetails = {
        id: plan_run_id,
        status: status,
        output: JSON.stringify(output),
        end_time: dayjs().format("YYYY-MM-DD HH:mm:ss")
    };

    let res = await dbFns.updateEntity('PLAN_RUNS', planRunDetails, "id", plan_run_id);
    return res;
}

module.exports = {
    startPlannerProcess
}