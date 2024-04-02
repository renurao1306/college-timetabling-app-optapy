const mysql2Proms = require('mysql2/promise');
const { dbSettings } = require('./settings');

let connection = null;

async function getConnection() {

    if (connection) {
        console.log("DB Connection is NOT null, reusing...");
        return connection;
    } else {
        console.log("DB Connection is null, connecting...");
        connection = await mysql2Proms.createConnection({ ...dbSettings });
        return connection;
    }
}

async function getEntityList(tableName) {
    const dbConn = await getConnection();

    const sqlStmt = `SELECT * FROM \`${tableName}\``;

    let res = await dbConn.execute(sqlStmt);

    return res;
}

// async function getRoomList() {
//     const dbConn = await getConnection();

//     let [rows] = await dbConn.execute('SELECT * FROM `ROOMS`;')

//     return rows;
// }

// async function getCourseList() {
//     const dbConn = await getConnection();

//     let [rows] = await dbConn.execute('SELECT * FROM `COURSES`;')

//     return rows;
// }

// async function getTimeslotList() {
//     const dbConn = await getConnection();

//     let [rows] = await dbConn.execute('SELECT * FROM `TIMESLOTS`;')

//     return rows;
// }

// async function getFixedSlotList() {
//     const dbConn = await getConnection();

//     let [rows] = await dbConn.execute('SELECT * FROM `FIXED_SLOTS`;')

//     return rows;
// }

// async function getConstraintList() {
//     const dbConn = await getConnection();

//     let [rows] = await dbConn.execute('SELECT * FROM `CONSTRAINTS`;')

//     return rows;
// }

// async function getGeneralRunParamsList() {
//     const dbConn = await getConnection();

//     let [rows] = await dbConn.execute('SELECT * FROM `GENERAL_RUN_PARAMS`;')

//     return rows;
// }

// Quote a value if it is a string, else not
function getFieldValue(value) {
    if (typeof (value) == 'string') {
        return '\'' + value + '\'';
    }
    else {
        return value;
    }
}

async function createEntity(tableName, entity) {
    const dbConn = await getConnection();

    let sqlStmt = `INSERT INTO \`${tableName}\` `;
    sqlStmt += "( ";
    for (let i in entity) {
        sqlStmt += i;
        sqlStmt += ',';
    }
    // Remove the trailing ","
    sqlStmt = sqlStmt.slice(0, sqlStmt.length - 1);

    sqlStmt += " )";

    // Add the values
    sqlStmt += " VALUES ";
    sqlStmt += "( ";

    for (let i in entity) {
        sqlStmt += getFieldValue(entity[i]);
        sqlStmt += ',';
    }

    // Remove the trailing ","
    sqlStmt = sqlStmt.slice(0, sqlStmt.length - 1);

    sqlStmt += " );";

    console.log("Formed SQL stmt", sqlStmt);

    let res = await dbConn.execute(sqlStmt);

    return res;
}

async function updateEntity(tableName, entity, idColumnName, currIdValue) {
    const dbConn = await getConnection();

    let sqlStmt = `UPDATE \`${tableName}\` SET `;
    for (let i in entity) {
        sqlStmt += i;
        sqlStmt += " = ";
        sqlStmt += getFieldValue(entity[i]);
        sqlStmt += ', ';
    }

    // Remove the trailing ", "
    sqlStmt = sqlStmt.slice(0, sqlStmt.length - 2);

    if (typeof (entity[idColumnName]) == "string") {
        sqlStmt += ` WHERE ${idColumnName} = '${currIdValue}'`;
    } else {
        sqlStmt += ` WHERE ${idColumnName} = ${currIdValue}`;
    }


    console.log("Formed SQL stmt", sqlStmt);

    let res = await dbConn.execute(sqlStmt);
    return res;
}

async function deleteEntity(tableName, id, idColumnName) {

    console.log("In deleteEntity", tableName, id, idColumnName);

    const dbConn = await getConnection();


    // If id is undefined or null, don't proceed
    if (id === undefined || id === null) {
        console.log("Id field is null, ignoring");
        return ({ data: { result_code: "err", result: {} } });

    }


    let fieldValue = getFieldValue(id);

    let sqlStmt = `DELETE FROM \`${tableName}\` WHERE ${idColumnName} = ${fieldValue};`;

    console.log("Formed SQL stmt", sqlStmt);

    let res = await dbConn.execute(sqlStmt);
    return res;
}

async function getEntity(tableName, id, idColumnName) {
    const dbConn = await getConnection();

    let fieldValue = getFieldValue(id);
    const sqlStmt = `SELECT * FROM \`${tableName}\` WHERE ${idColumnName} = ${fieldValue}`;

    let res = await dbConn.execute(sqlStmt);

    return res;

}

// Helper function to form the where clause
function getWhereClause(arrWhereColumns) {
    let whereClause = "WHERE ";
    for (let w of arrWhereColumns) {
        let fieldValue = getFieldValue(w.value);
        whereClause += `${w.columnName} = ${fieldValue} AND `;
    }
    // Take care of the empty AND at the last
    whereClause += "1 = 1;"; // Valid WHERE clause

    return whereClause;
}

async function getEntityListMultipleWhere(tableName, arrWhereColumns) {
    const dbConn = await getConnection();

    let whereClause = getWhereClause(arrWhereColumns);

    const sqlStmt = `SELECT * FROM \`${tableName}\` ${whereClause}`;
    console.log("Formed SQL stmt = ", sqlStmt);

    let res = await dbConn.execute(sqlStmt);

    return res;
}

async function updateEntityMultipleWhere(tableName, newEntity, arrWhereColumns) {
    const dbConn = await getConnection();

    let sqlStmt = `UPDATE \`${tableName}\` SET `;

    for (let i in newEntity) {
        sqlStmt += i;
        sqlStmt += " = ";
        sqlStmt += getFieldValue(newEntity[i]);
        sqlStmt += ', ';
    }

    // Remove the trailing ", "
    sqlStmt = sqlStmt.slice(0, sqlStmt.length - 2);

    let whereClause = getWhereClause(arrWhereColumns);

    sqlStmt += ` ${whereClause};`;
    console.log("Formed SQL stmt = ", sqlStmt);

    let res = await dbConn.execute(sqlStmt);

    return res;
}


async function deleteEntityMultipleWhere(tableName, arrWhereColumns) {
    const dbConn = await getConnection();

    let whereClause = getWhereClause(arrWhereColumns);
    let sqlStmt = `DELETE FROM \`${tableName}\` ${whereClause};`;

    console.log("Formed SQL stmt = ", sqlStmt);

    let [rows] = await dbConn.execute(sqlStmt);

    return rows;
}

async function getOverviewCounts() {
    const dbConn = await getConnection();

    let tableNames = [
        "ROOMS",
        "COURSES",
        "TIMESLOTS",
        "FIXED_SLOTS",
        "PLAN_RUNS"
    ];

    let retArr = [];

    for (let tblName of tableNames) {

        const sqlStmt = `SELECT COUNT(1) count FROM \`${tblName}\``;

        let res = await dbConn.execute(sqlStmt);

        console.log(res[0][0].count);

        retArr.push({entity: tblName, count: res[0][0].count})
    }

    return retArr;
}


module.exports = {
    getConnection,
    // getRoomList,
    // getCourseList,
    // getTimeslotList,
    // getFixedSlotList,
    // getConstraintList,
    // getGeneralRunParamsList,
    getEntityList,
    createEntity,
    updateEntity,
    deleteEntity,
    getEntity,
    getEntityListMultipleWhere,
    updateEntityMultipleWhere,
    deleteEntityMultipleWhere,
    getOverviewCounts
};
