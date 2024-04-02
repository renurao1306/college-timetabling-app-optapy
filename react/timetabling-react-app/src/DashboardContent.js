import * as React from 'react';
import { useState } from 'react';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

import Title from './Title';
import LoadingIndicator from './LoadingIndicator.js';
import { useLoadData } from './utilityFns.js';

function preventDefault(event) {
  event.preventDefault();
}

function InfoCard(props) {
  return (
    <Card sx={{ backgroundColor: props.backgroundColor }}>
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {props.title}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: 'center' }}>
          <Typography variant="h3" gutterBottom>
            {props.text}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardContent() {

  const [isLoading, setIsLoading] = useState(true);
  const [entityCountList, setEntityCountList] = useState([]);

  useLoadData("/getOverviewCounts", setEntityCountList, setIsLoading, null);

  if (isLoading) {
    return (
      <LoadingIndicator />
    );
  } else {

    let bgColors =
      {
        "ROOMS": "yellow",
        "COURSES": "cyan",
        "TIMESLOTS": "orange",
        "FIXED_SLOTS": "lightgreen",
        "PLAN_RUNS": "pink"
      };

    return (
      <React.Fragment>
        <Title>Dashboard</Title>

        {/* Dashboard contents will be displayed here <b>(currently hard-coded)</b> */}

        <Divider />

        <Stack direction="row" spacing={2}>

          {
            entityCountList.map((row) => <InfoCard title={row.entity} text={row.count} backgroundColor={bgColors[row.entity]} />)
          }
        </Stack>

        <Divider />


        {/* Hard coded ones below
        <Stack direction="column" spacing={4}>

          <Stack direction="row" spacing={2}>

            <InfoCard title="Rooms" text="4" backgroundColor="yellow" />
            <InfoCard title="Courses" text="10" backgroundColor="cyan" />
            <InfoCard title="Timeslots" text="48" backgroundColor="orange" />
          </Stack>

          <Stack direction="row" spacing={2}>
            <InfoCard title="Fixed Slots" text="6" backgroundColor="lightgreen" />
            <InfoCard title="Plan Runs" text="2" backgroundColor="pink" />

          </Stack>
        </Stack> */}

      </React.Fragment>
    );
  }
}
