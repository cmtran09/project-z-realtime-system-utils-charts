import React, { useState, useEffect } from 'react'
import moment from 'moment'
import "moment-duration-format"

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
    const timeArr = (moment.duration(systemUptime.systemUptimeSeconds, "seconds").format('DD:HH:mm:ss').split(':')).map(elem => Number(elem))
    const formattedData = [
      {
        name: 'days',
        value: timeArr[0],
        fill: "#8884d8"
      },
      {
        name: 'hours',
        value: timeArr[1],
        fill: "#83a6ed"
      },
      {
        name: 'mins',
        value: timeArr[2],
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

  return (
    <React.Fragment>
      <div>
        <p>{`System Uptime`}</p>
        <Days days={[systemUptime[0]]} />
        <Hours hours={[systemUptime[1]]} />
        <Mins mins={[systemUptime[2]]} />
      </div>
    </React.Fragment>
  )
}
