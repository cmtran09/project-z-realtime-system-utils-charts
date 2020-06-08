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

import './Dashboard.scss'

export default function Dashboard() {
  return (
    <React.Fragment>
      <Grid stackable columns={3}>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <SystemInformation />
            </Segment>
            <Segment>
              <p>System Uptime</p>
              <SystemUptime />
            </Segment>
          </Grid.Column>
          <Grid.Column className='battery-column'>
            <Segment>
              <p>Battery</p>
              <Battery />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <p>Random Access Memory</p>
              <FreeMemoryPercentage />
              <RamInfo />
            </Segment>
          </Grid.Column>
        </Grid.Row >
      </Grid>
      <Grid stackable columns={1}>
        <Grid.Column>
          <Segment>
            <Grid stackable columns={2}>
              <Grid.Column width={3}>
                <CpuInformation />
              </Grid.Column>
              <Grid.Column width={12}>
                <CpuUsage />
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
      <Grid stackable columns={3}>
      <Grid.Row stretched>
        <Grid.Column>
          <Segment>
            <GraphicsAndDisplays />
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
            <p>System Uptime</p>
            <SystemUptime />
          </Segment>
          <Segment>
            <p>System Uptime</p>
            <SystemUptime />
          </Segment>
        </Grid.Column>
        </Grid.Row >
      </Grid>
    </React.Fragment>
  )
}
