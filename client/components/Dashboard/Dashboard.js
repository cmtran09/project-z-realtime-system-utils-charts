import React from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'

import SystemUptime from '../../components/SystemUptime/SystemUptime'
import FreeMemoryPercentage from '../../components/FreeMemoryPercentage/FreeMemoryPercentage'
import CpuUsage from '../../components/CpuUsage/CpuUsage'
import CpuInformation from '../../components/CpuInformation/CpuInformation'
import SystemInformation from '../../components/SystemInformation/SystemInformation'
import DiskMemory from '../../components/DiskMemory/DiskMemory'
import RamInfo from '../../components/RamInfo/RamInfo'
import GraphicsAndDisplays from '../../components/GraphicsAndDisplays/GraphicsAndDisplays'
import Battery from '../../components/Battery/Battery'

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
            <p>Graphics and Displays</p>
            <GraphicsAndDisplays />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <p>Battery</p>
            <Battery />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <SystemUptime />
            <p>System Uptime</p>
          </Segment>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}
