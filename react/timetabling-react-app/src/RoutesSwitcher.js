import { Switch, Route } from 'react-router-dom';

import DashboardContent from './DashboardContent.js';
import RoomList from './RoomList.js';
import CourseList from './CourseList.js';
import TimeslotList from './TimeslotList.js';
import PlanRunList from './PlanRunList.js';
import ViewTimeTable from './ViewTimeTable.js';
import ParamsAndConstraintList from './ParamsAndConstraintList.js';

import screenRoutes from './screenRoutes.js';

export function RoutesSwitcher(props) {

    return (
        <Switch>
            {
                screenRoutes.map((r) => {
                    return r.exactPath ? (
                        <Route exact path={r.routePath}>
                            {r.screenComponent}
                        </Route>
                    )
                    :
                    (
                        <Route path={r.routePath}>
                            {r.screenComponent}
                        </Route>
                    ) 
                })
            }

        </Switch>

    );

}

export function OldRoutesSwitcher(props) {

    return (
        <Switch>
            {/* <Route path="/about">
      <Deposits />
    </Route>
    <Route path="/users">
      <Copyright />
    </Route> */}

            <Route path="/roomList">
                <RoomList />
            </Route>

            <Route path="/courseList">
                <CourseList />
            </Route>

            <Route path="/timeslotList">
                <TimeslotList />
            </Route>

            <Route path="/planRunList">
                <PlanRunList />
            </Route>

            {/* <Route path="/orders">
          <Orders />
        </Route> */}

            <Route path="/viewTimeTable/:planRunId">
                <ViewTimeTable />
            </Route>

            <Route path="/paramsAndConstraintList/:planRunId">
                <ParamsAndConstraintList />
            </Route>

            <Route exact path="/">
                <DashboardContent />
            </Route>

        </Switch>

    );

}