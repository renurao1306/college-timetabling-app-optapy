import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { Link, useHistory } from 'react-router-dom';

import screenRoutes from './screenRoutes.js';

export function MainListItems(props) {
  console.log("In mainListItems", props);
  // let history = useHistory();
  return (

    <React.Fragment>

      {
        screenRoutes.map((r) => {

          // Only if a displayName is present; else
          // it is an inner route not displayed via the
          // Dashboard left entries
          if (r.displayName) {

            return (
              <ListItemButton>
                <ListItemIcon>
                  {r.displayIcon}
                </ListItemIcon>
                <ListItemText primary={r.displayName} onClick={() => props.hist.push(r.routePath)} />
              </ListItemButton>
            )
          }
        })
      }


    </React.Fragment>
  );
}


export function OldMainListItems(props) {
  console.log("In OldmainListItems", props);
  // let history = useHistory();
  return (

    <React.Fragment>
      {/* <ListItemButton onClick={() => props.hist.push("/users")}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard"/>
    </ListItemButton>
    
    <ListItemButton onClick={() => props.hist.push("/about")}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Customer Orders" />
    </ListItemButton> */}

      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Rooms" onClick={() => props.hist.push("/roomList")} />
      </ListItemButton>


      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Courses" onClick={() => props.hist.push("/courseList")} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Timeslots" onClick={() => props.hist.push("/timeslotList")} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Plan Runs" onClick={() => props.hist.push("/planRunList")} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" onClick={() => props.hist.push("/orders")} />
      </ListItemButton>


    </React.Fragment>
  );
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
