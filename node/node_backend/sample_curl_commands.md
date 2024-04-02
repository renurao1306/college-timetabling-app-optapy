# Sample Curl Commands and their outputs

This contains the commands using curl for the API endpoints, and their results.

## Get Room List

### Command

 ```bash
  curl -X GET http://localhost:3000/getRoomList -H 'Content-Type: application/json'
```

### Output

 ```json
 {"result_code":"OK","result":[{"id":1,"name":"CR-47","type":"Classroom","enabled":1},{"id":2,"name":"CL-9","type":"Lab","enabled":1}]}
 ```

## Get Constraints for a Plan Run

### Command

```bash
  curl -X GET http://localhost:3000/getConstraintList -H 'Content-Type: application/json' -d '{"plan_run_id": 1}'
```

### Output

```json

{"result_code":"OK","result":[{"plan_run_id":1,"name":"room_conflict","external_name":null,"description":null,"type":"hard","weight":100,"params":{"max_hrs_in_day":5},"enabled":1},{"plan_run_id":1,"name":"student_group_conflict","external_name":null,"description":null,"type":"hard","weight":1,"params":{},"enabled":1}]}

``````

## Get GeneralRunParams for a Plan Run


### Command

```bash
curl -X GET http://localhost:3000/getGeneralRunParamList -H 'Content-Type: application/json' -d '{"plan_run_id": 1}'
```

### Output
```json

{"result_code":"OK","result":[{"plan_run_id":1,"param_name":"max_hrs_in_day","param_external_name":"Maximum hours that a student group can attend courses in a day","param_value":5},{"plan_run_id":1,"param_name":"runtime_in_secs","param_external_name":"Runtime limit in seconds for the planner","param_value":30}]}
```

## Create Constraints for a new Plan Run:

### Command

```bash
curl -X POST http://localhost:3000/createConstraint -H 'Content-Type: application/json' -d '{"plan_run_id": 3, "name": "xyz_conflict", "type": "hard", "weight": 10, "enabled": 1}'
```

### Output

```json
{"result_code":"OK","result":[{"fieldCount":0,"affectedRows":1,"insertId":0,"info":"","serverStatus":2,"warningStatus":0,"changedRows":0},null]}

```

## Get Constraint List

## Command

```bash
curl -X GET http://localhost:3000/getConstraintList -H 'Content-Type: application/json' -d '{"plan_run_id": 3}'
```
### Output

```json
{"result_code":"OK","result":{"plan_run_id":3,"name":"xyz_conflict","external_name":null,"description":null,"type":"hard","weight":10,"params":null,"enabled":1}}
```

## Create a new Plan Run

### Command

```bash
curl -X POST http://localhost:3000/createPlanRun -H 'Content-Type: application/json' -d '{"start_time": "2023-10-19 19:54:34", "planner_process_id": 512, "status": "In Progress"}'
```
### Output

> Note insert id returned in the output (auto incremented field)**

```json
{"result_code":"OK","result":[{"fieldCount":0,"affectedRows":1,"insertId":3,"info":"","serverStatus":2,"warningStatus":0,"changedRows":0},null]}
```

## Get Plan Run List

### Command

```bash
curl -X GET http://localhost:3000/getPlanRunList -H 'Content-Type: application/json'
```

### Output

```json
{"result_code":"OK","result":[{"id":1,"start_time":"2023-10-19 15:28:24","end_time":"2023-10:19 15:33:15","planner_process_id":null,"status":"Completed","output":{"score":{},"room_list":[{"id":1,"name":"CR-47",......<TRUNCATED>....}, {"id":40,"end_time":"15:00:00","start_time":"14:00:00","day_of_week":"SATURDAY"}],"_optapy_solver_run_id":[139920816005808,139920815800016,{"hex":"332c3bc46e6a11ee95ecac2b6e9a3080"}]}},{"id":3,"start_time":"2023-10-19 19:54:34","end_time":null,"planner_process_id":512,"status":"In Progress","output":null}]}
```

## Run a Plan

### Command

```bash
curl -X POST http://localhost:3000/runPlan -H 'Content-Type: application/json' -d '{"id": 1}'
```

### Output

```json
{"result_code":"OK","result":"<<<put child pid + start_time here>>>"}
```
