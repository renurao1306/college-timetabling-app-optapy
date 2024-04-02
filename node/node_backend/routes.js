const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const dayjs = require('dayjs');

const dbFns = require('./dbFns.js');
const { startPlannerProcess } = require('./handlePlannerRun.js');

// Routes - App

function setupRoutes(app, bodyParser, io) {

    setupGetListRoutes(app, bodyParser);
    setupCreateEntityRoutes(app, bodyParser);
    setupUpdateEntityRoutes(app, bodyParser);
    setupDeleteEntityRoutes(app, bodyParser);

    setupGetListRoutesWithPlanId(app, bodyParser);
    setupUpdateEntityRoutesWithPlanId(app, bodyParser);
    setupDeleteEntityRoutesWithPlanId(app, bodyParser);

    // app.get('/getRoomList', urlencodedParser, async (req, res) => {
    //     console.log('in getRoomList');
    //     let rows = await dbFns.getEntityList('ROOMS');
    //     //console.log('devices rcvd ', rows);
    //     res.send({
    //         result_code: 'OK',
    //         result: rows
    //     });
    //     //console.log('sent data of devices');
    // });

    // Overivew for the Dashboard
    app.get('/getOverviewCounts', urlencodedParser, async (req, res) => {

        try {
            console.log('in /getOVerviewCounts for run plan id');

            let overviewCounts = await dbFns.getOverviewCounts();

            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'OK',
                result: overviewCounts
            });
        } catch (err) {
            console.log("An error occurred", err);

            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'Err',
                result: {}
            });
        }
    });

    // Triggering a new run of the planner
    app.post('/runPlan', urlencodedParser, async (req, res) => {

        try {
            console.log('in /runPlan for run plan id', req.body.id, req.body.isDryRun);

            startPlannerProcess(req.body.id, io, req.body.isDryRun);

            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'OK',
                result: "<<<put child pid + start_time here>>>"
            });
        } catch (err) {
            console.log("An error occurred", err);

            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'Err',
                result: {}
            });
        }
    });

    app.all('/welcome', urlencodedParser, (req, res) => {                            //*ONLY for debugging purposes
        console.log('item recvd', req.body);
        console.log(dayjs().format('YYYY-MM-DD HH:MM:ss'))
        res.send({ code: 'OK', msg: 'welcome' });
    });
};

function setupGetListRoutes(app, bodyParser) {
    let getListRoutes = [
        { route: '/getRoomList', entity: "ROOMS" },
        { route: '/getCourseList', entity: "COURSES" },
        { route: '/getTimeslotList', entity: "TIMESLOTS" },
        { route: '/getFixedSlotList', entity: "FIXED_SLOTS" },
        { route: '/getFixedSlotViewList', entity: "FIXED_SLOTS_VIEW" },
        { route: '/getPlanRunList', entity: "PLAN_RUNS" },
        // Below 2 are now with plan_run_id
        // { route: '/getConstraintList', entity: "CONSTRAINTS"},
        // { route: '/getGeneralRunParamList', entity: "GENERAL_RUN_PARAMS"},
    ];

    for (let r of getListRoutes) {
        console.log("### Registering", r.route);

        app.get(r.route, urlencodedParser, async (req, res) => {

            try {
                console.log('in ', r.route);
                let [rows] = await dbFns.getEntityList(r.entity);
                console.log('got rows ', rows);
                res.header('Content-type', 'application/json');
                res.send({
                    result_code: 'OK',
                    result: rows
                });
            } catch (err) {
                console.log("An error occurred", err);

                res.header('Content-type', 'application/json');
                res.send({
                    result_code: 'Err',
                    result: {}
                });
            }
        });
    }
}

function setupCreateEntityRoutes(app, bodyParser) {
    let createEntityRoutes = [
        { route: '/createRoom', entity: "ROOMS" },
        { route: '/createCourse', entity: "COURSES" },
        { route: '/createTimeslot', entity: "TIMESLOTS" },
        { route: '/createFixedSlot', entity: "FIXED_SLOTS" },
        { route: '/createConstraint', entity: "CONSTRAINTS" },
        { route: '/createGeneralRunParam', entity: "GENERAL_RUN_PARAMS" },
        { route: '/createPlanRun', entity: "PLAN_RUNS" },
    ];

    for (let r of createEntityRoutes) {

        console.log("### Registering", r.route);

        app.post(r.route, urlencodedParser, async (req, res) => {

            try {
                console.log('in ', r.route, req.body);

                result = await dbFns.createEntity(r.entity, req.body);
                //console.log('devices rcvd ', rows);
                res.header('Content-type', 'application/json');
                res.send({
                    result_code: 'OK',
                    result: result
                });
            } catch (err) {
                console.log("An error occurred", err);

                res.header('Content-type', 'application/json');
                res.send({
                    result_code: 'Err',
                    result: {}
                });
            }
        });
    }
}

function setupUpdateEntityRoutes(app, bodyParser) {
    let updateEntityRoutes = [
        { route: '/updateRoom', entity: "ROOMS", idColumnName: 'id' },
        { route: '/updateCourse', entity: "COURSES", idColumnName: 'id' },
        { route: '/updateTimeslot', entity: "TIMESLOTS", idColumnName: 'id' },
        { route: '/updateFixedSlot', entity: "FIXED_SLOTS", idColumnName: 'id' },
        { route: '/updatePlanRun', entity: "PLAN_RUNS", idColumnName: 'id' },
        // Below 2 are now with plan_run_id
        // { route: '/updateConstraintList', entity: "CONSTRAINTS", idColumnName: 'name'},
        // { route: '/updateGeneralRunParamList', entity: "GENERAL_RUN_PARAMS", idColumnName: 'param_name'},
    ];

    for (let r of updateEntityRoutes) {
        console.log("### Registering", r.route);

        app.post(r.route, urlencodedParser, async (req, res) => {
            try {
            console.log('in ', r.route, req.body);

            result = await dbFns.updateEntity(r.entity, req.body, r.idColumnName, req.body.id);
            //console.log('devices rcvd ', rows);
            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'OK',
                result: result
            });
        } catch (err) {
            console.log("An error occurred", err);

            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'Err',
                result: {}
            });
        }
        });
    }
}

function setupDeleteEntityRoutes(app, bodyParser) {
    let deleteEntityRoutes = [
        { route: '/deleteRoom', entity: "ROOMS", idColumnName: 'id' },
        { route: '/deleteCourse', entity: "COURSES", idColumnName: 'id' },
        { route: '/deleteTimeslot', entity: "TIMESLOTS", idColumnName: 'id' },
        { route: '/deleteFixedSlot', entity: "FIXED_SLOTS", idColumnName: 'id' },
        { route: '/deletePlanRun', entity: "PLAN_RUNS", idColumnName: 'id' },
        // Below 2 are now with plan_run_id
        // { route: '/deleteConstraint', entity: "CONSTRAINTS", idColumnName: 'name'},
        // { route: '/deleteGeneralRunParam', entity: "GENERAL_RUN_PARAMS", idColumnName: 'param_name'},
    ];

    for (let r of deleteEntityRoutes) {
        console.log("### Registering", r.route);

        app.post(r.route, urlencodedParser, async (req, res) => {

            try {
            console.log('in ', r.route, req.body);

            result = await dbFns.deleteEntity(r.entity, req.body.id, r.idColumnName);
            //console.log('devices rcvd ', rows);
            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'OK',
                result: result
            });
        } catch (err) {
            console.log("An error occurred", err);

            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'Err',
                result: {}
            });
        }
        });
    }
}

function setupGetListRoutesWithPlanId(app, bodyParser) {
    let getListRoutes = [
        { route: '/getConstraintList', entity: "CONSTRAINTS", whereColumnNames: ["plan_run_id"] },
        { route: '/getGeneralRunParamList', entity: "GENERAL_RUN_PARAMS", whereColumnNames: ["plan_run_id"] },
        { route: '/getPlanRunDetails', entity: "PLAN_RUNS", whereColumnNames: ["id"] },
    ];

    for (let r of getListRoutes) {
        console.log("### Registering", r.route);

        app.get(r.route, urlencodedParser, async (req, res) => {
            try { 
            console.log('in ', r.route, req.params, req.query, req.body);

            whereColumns = [];
            for (let c of r.whereColumnNames) {
                whereColumns.push({ columnName: c, value: req.query[c] });
            }

            let [rows] = await dbFns.getEntityListMultipleWhere(r.entity, whereColumns);
            console.log('got rowzs ', rows);
            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'OK',
                result: rows
            });
        } catch (err) {
            console.log("An error occurred", err);

            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'Err',
                result: {}
            });
        }
        });
    }
}

function setupUpdateEntityRoutesWithPlanId(app, bodyParser) {
    let updateEntityRoutes = [
        { route: '/updateConstraint', entity: "CONSTRAINTS", whereColumnNames: ['id', 'plan_run_id'] },
        { route: '/updateGeneralRunParam', entity: "GENERAL_RUN_PARAMS", whereColumnNames: ['id', 'plan_run_id'] }
    ];

    for (let r of updateEntityRoutes) {
        console.log("### Registering", r.route);

        app.post(r.route, urlencodedParser, async (req, res) => {
            try {
            console.log('in ', r.route, req.body);

            let whereColumns = [];
            for (let c of r.whereColumnNames) {
                whereColumns.push({ columnName: c, value: req.body[c] });
            }

            result = await dbFns.updateEntityMultipleWhere(r.entity, req.body, whereColumns);
            //console.log('devices rcvd ', rows);
            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'OK',
                result: result
            });
        } catch (err) {
            console.log("An error occurred", err);

            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'Err',
                result: {}
            });
        }
        });
    }
}

function setupDeleteEntityRoutesWithPlanId(app, bodyParser) {
    // let deleteEntityRoutes = [
    //     { route: '/deleteConstraint', entity: "CONSTRAINTS", whereColumnNames: ['id', 'plan_run_id', 'name'] },
    //     { route: '/deleteGeneralRunParam', entity: "GENERAL_RUN_PARAMS", whereColumnNames: ['id', 'plan_run_id', 'param_name'] },
    // ];


    let deleteEntityRoutes = [
        { route: '/deleteConstraint', entity: "CONSTRAINTS", whereColumnNames: ['id'] },
        { route: '/deleteGeneralRunParam', entity: "GENERAL_RUN_PARAMS", whereColumnNames: ['id'] },
    ];

    for (let r of deleteEntityRoutes) {
        console.log("### Registering", r.route);

        app.post(r.route, urlencodedParser, async (req, res) => {
            try {
            console.log('in ', r.route, req.body);

            let whereColumns = [];
            for (let c of r.whereColumnNames) {
                whereColumns.push({ columnName: c, value: req.body[c] });
            }

            result = await dbFns.deleteEntityMultipleWhere(r.entity, whereColumns);
            //console.log('devices rcvd ', rows);
            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'OK',
                result: result
            });
        } catch (err) {
            console.log("An error occurred", err);

            res.header('Content-type', 'application/json');
            res.send({
                result_code: 'Err',
                result: {}
            });
        }
        });
    }
}

module.exports = {
    setupRoutes
};
