import React, { useState, useEffect } from 'react'
import moment from 'moment'
import "moment-duration-format"
import { Grid } from 'semantic-ui-react'

import './SystemUptime.scss'

import io from 'socket.io-client'


import Mins from './Mins/Mins'
import Hours from './Hours/Hours'
import Days from './Days/Days'



const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

const initialUptime = [
  {
    name: 'days',
    value: 0,
    fill: "#8884d8"
  },
  {
    name: 'hours',
    value: 0,
    fill: "#83a6ed"
  },
  {
    name: 'mins',
    value: 0,
    fill: "#8dd1e1"
  }
]

export default function SystemUptime() {
  const [systemUptime, setSystemUptime] = useState(initialUptime)

  console.log("systemUptime", systemUptime)

  const formatData = (systemUptime) => {
    const timeArr = (moment.duration(systemUptime.systemUptimeSeconds, "seconds").format('DD:HH:mm').split(':')).map(elem => Number(elem))
    const formattedData = [
      {
        name: 'days',
        value: timeArr.length === 3 ? timeArr[0] :
          0,
        fill: "#8884d8"
      },
      {
        name: 'hours',
        value: timeArr.length === 3 ? timeArr[1] :
          timeArr.length === 2 ? timeArr[0] :
            0,
        fill: "#83a6ed"
      },
      {
        name: 'mins',
        value: timeArr.length === 3 ? timeArr[2] :
          timeArr.length === 2 ? timeArr[1] :
            timeArr.length === 1 ? timeArr[0] :
              0,
        fill: "#8dd1e1"
      }
    ]
    return formattedData
  }


  useEffect(() => {
    socket.on('systemUptime', (systemUptimeData) => {
      const data = formatData(systemUptimeData)
      setSystemUptime(data)
    })
  }, [])

  const tomArr = (moment.duration(66, "seconds").format('DD:HH:mm').split(':')).map(elem => Number(elem))
  const foData = [
    {
      name: 'days',
      value: tomArr.length === 3 ? tomArr[0] :
        0,
      fill: "#8884d8"
    },
    {
      name: 'hours',
      value: tomArr.length === 3 ? tomArr[1] :
        tomArr.length === 2 ? tomArr[0] :
          0,
      fill: "#83a6ed"
    },
    {
      name: 'mins',
      value: tomArr.length === 3 ? tomArr[2] :
        tomArr.length === 2 ? tomArr[1] :
          tomArr.length === 1 ? tomArr[0] :
            0,
      fill: "#8dd1e1"
    }
  ]

  return (
    <React.Fragment>
      <div>
        <p>{`System Uptime`}</p>
        <Grid className='system-uptime-charts' columns={3}>
          <Grid.Column>
            <Days days={[systemUptime[0]]} />
          </Grid.Column>
          <Grid.Column>
            <Hours hours={[systemUptime[1]]} />
          </Grid.Column>
          <Grid.Column>
            <Mins mins={[systemUptime[2]]} />
          </Grid.Column>
        </Grid>
      </div>
    </React.Fragment >
  )
}
