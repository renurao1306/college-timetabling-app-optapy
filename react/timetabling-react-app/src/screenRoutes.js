import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockClockIcon from '@mui/icons-material/LockClock';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import GridViewIcon from '@mui/icons-material/GridView';
import ArchitectureIcon from '@mui/icons-material/Architecture';

import DashboardContent from './DashboardContent.js';
import RoomList from './RoomList.js';
import CourseList from './CourseList.js';
import TimeslotList from './TimeslotList.js';
import FixedSlotList from './FixedSlotList.js';
import PlanRunList from './PlanRunList.js';
import ViewTimeTable from './ViewTimeTable.js';
import ParamsAndConstraintList from './ParamsAndConstraintList.js';
import PlanRunGeneralParamList from './PlanRunGeneralParamList.js';
import PlanRunConstraintList from './PlanRunConstraintList.js';
import TestList from './TestList.js';
import TestLayout from './TestLayout.js';
// import Orders from './Orders.js';

let screenRoutes = [
    
    {routePath: "/", exactPath: true, screenComponent: <DashboardContent/> },
    {displayName: "Dashboard", displayIcon: <GridViewIcon/>, routePath: "/dashboardContent", screenComponent: <DashboardContent/> },
    {displayName: "Rooms", displayIcon: <MapsHomeWorkIcon/>, routePath: "/roomList", screenComponent: <RoomList/> },
    {displayName: "Courses", displayIcon: <MenuBookIcon/>, routePath: "/courseList", screenComponent: <CourseList/> },
    {displayName: "Timeslots", displayIcon: <AccessTimeIcon/>, routePath: "/timeslotList", screenComponent: <TimeslotList/> },
    {displayName: "Fixed Slots", displayIcon: <LockClockIcon/>, routePath: "/FixedSlotList", screenComponent: <FixedSlotList/> },    
    {displayName: "Plan Runs", displayIcon: <DirectionsRunIcon/>, routePath: "/planRunList", screenComponent:  <PlanRunList/> },
    {routePath: "/viewTimeTable/:planRunId", screenComponent: <ViewTimeTable/> },
    {routePath: "/paramsAndConstraintList/:planRunId", screenComponent: <ParamsAndConstraintList/> },
    {routePath: "/planRunGeneralParamList/:planRunId", screenComponent: <PlanRunGeneralParamList/> },
    {routePath: "/planRunConstraintList/:planRunId", screenComponent: <PlanRunConstraintList/> },
    // {displayName: "Test List", displayIcon: <PeopleIcon/>, routePath: "/test", screenComponent:  <TestList/> },
    {displayName: "Test Layout", displayIcon: <ArchitectureIcon/>, routePath: "/testLayout", screenComponent:  <TestLayout/> },
    // {displayName: "Orders", displayIcon: <PeopleIcon/>, routePath: "/orders", screenComponent:  <Orders/> },
    // {displayName: "Blah", displayIcon: <PeopleIcon/>, routePath: "/orders", screenComponent:  <Orders/> },
];

export default screenRoutes;