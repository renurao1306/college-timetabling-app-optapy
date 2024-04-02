module.exports = {
    dbSettings: {
        host: "localhost",
        user: "root",
        database: "mca_sem2_timetable",
        password: "MyNewPass"
    },
    serverSettings: {
        port: 4000
    },
    plannerSettings: {
        inputDataGenerationFileDir: String.raw `D:\tmp2`,
        python3Path: String.raw `D:\Acads\MPSTME-MCA\SEM 1\Operating Systems\Mini-Project\OptaPy-venvMine\Scripts\python.exe`,
        mainPyPath: String.raw `D:\Acads\MPSTME-MCA\SEM 1\Operating Systems\Mini-Project\tmp-venv\indian-college-timetabling\main.py`
    },
    webSocketRoom: "plan_run_status_update"

};
