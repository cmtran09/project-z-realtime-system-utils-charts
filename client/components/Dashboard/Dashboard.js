import React from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'

import SystemUptime from '../../components/SystemUptime/SystemUptime'
import FreeMemoryPercentage from '../../components/FreeMemoryPercentage/FreeMemoryPercentage'
import CpuUsage from '../../components/CpuUsage/CpuUsage'
import CpuInformation from '../../components/CpuInformation/CpuInformation'
import SystemInformation from '../../components/SystemInformation/SystemInformation'
import DiskMemory from '../../components/DiskMemory/DiskMemory'
import RamInfo from '../../components/RamInfo/RamInfo'

export default function Dashboard() {
  return (
    <React.Fragment>
      <Grid stackable columns={3}>
        <Grid.Column>
          <Segment>
            <SystemInformation />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <p>Free Memory (DISK)</p>
            <DiskMemory />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <FreeMemoryPercentage />
            <p>Free Memory (RAM) Percentage</p>
            <RamInfo />
          </Segment>
        </Grid.Column>
      </Grid>
      <Grid stackable columns={1}>
        <Grid.Column>
          <Segment>
            <CpuInformation />
            <CpuUsage />
          </Segment>
        </Grid.Column>
      </Grid>
      {/* <Grid stackable columns={1}>
        <Grid.Column>
          <Segment>
            <p>System Uptime</p>
          </Segment>
        </Grid.Column>
      </Grid> */}
      <Grid stackable columns={3}>
        <Grid.Column>
          <Segment>
            <p>Process Uptime</p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <p>Free Memory Percentage</p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <SystemUptime />
            <p>System Uptime</p>
          </Segment>
        </Grid.Column>
      </Grid>
      <Grid stackable columns={4}>
        <Grid.Column>
          <Segment>
            <p>CPU Count</p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <p>Average Load 1 min</p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <p>Average Load 2 min</p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <p>Average Load 5 min</p>
          </Segment>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}
