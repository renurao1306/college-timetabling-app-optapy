const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Using util.promisify
async function mainWithPromisify() {
    try {
      let execRet = await exec('ls');
      console.log(execRet);

    
      console.log("===");
    //   {stdout, stderr} = execRet;

      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    } catch (e) {
      console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
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
      console.log("Child pid", execRet.child.pid);
  });
}

async function main()
{
  let pythonPath = String.raw `D:\Acads\MPSTME-MCA\SEM 1\Operating Systems\Mini-Project\OptaPy-venvMine\Scripts\python.exe`;
  let mainPyPath = String.raw `D:\Acads\MPSTME-MCA\SEM 1\Operating Systems\Mini-Project\tmp-venv\indian-college-timetabling\main.py`;
  let inputJsonPath = String.raw `D:\tmp2\plan_run_5.json`;
  
  let cmdLine = `${pythonPath} ${mainPyPath} ${inputJsonPath} json`;
  
  /* 
  let res = await spawnProcess(cmdLine);
  console.log("### Got results", res);
  */

  // .then version
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
  });
}


async function getSolutionJSON(output)
{
  // console.log("Finding in", output.length);

  // Find the beginning string
  let startIndex = output.indexOf("### JSON SOLUTION BEGINS ###");
  let endIndex = output.indexOf("### JSON SOLUTION ENDS ###");

  // +26 from start to skip over the start token line
  // console.log(startIndex + 28, endIndex);
  let ret = JSON.parse(output.slice(startIndex+28, endIndex));
  // console.log(ret);
  return ret;
}

async function loadAndGetSolutionJSON()
{
  // For now, read the output from a file
  const fs = require('fs');
  let output = fs.readFileSync('sampleSolutionJsonOutput.txt');

  let outJson = await getSolutionJSON(output);

  // Try accessing some members
  console.log("Course 0 timeslot", 
  outJson.course_list[0].timeslot.day_of_week,
    outJson.course_list[0].timeslot.start_time,
    outJson.course_list[0].timeslot.end_time);

  console.log("Score of the solution", outJson.score_str);
}

// loadAndGetSolutionJSON();
main();

