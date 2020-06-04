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

export default function SystemUptime() {
  const [systemUptime, setSystemUptime] = useState({})

  useEffect(() => {
    socket.on('systemUptime', (systemUptimeData) => {
      setSystemUptime(systemUptimeData)
    })
  }, [])

  const formatData = (systemUptime) => {
    const timeArr = moment.duration(systemUptime.systemUptimeSeconds, "seconds").format('DD:HH:mm:ss').split(':')
    const formattedData = [
      {
        name: 'days',
        value: Number(timeArr[0]),
        fill: "#8884d8"
      },
      {
        name: 'hours',
        value: Number(timeArr[1]),
        fill: "#83a6ed"
      },
      {
        name: 'mins',
        value: Number(timeArr[2]),
        fill: "#8dd1e1"
      },
      {
        name: 'seconds',
        value: Number(timeArr[3]),
        fill: "#82ca9d"
      }
    ]
    return formattedData
  }

  console.log("formatted", formatData(systemUptime))

  const data = formatData(systemUptime)
  console.log("DATASADSADASDASDASDASDASASD", data)

  //SPLIT COMPONTNETS UP INDIIDUAL COMPONENT FOR EACHT TIME METRIC 

  return (
    <React.Fragment>
      {/* <button onClick={e => console.log(moment.duration(systemUptime.systemUptimeSeconds), "seconds").format("hh:mm:ss")}>click</button> */}
      <div>
        <p>{`System Uptime secs:${systemUptime.systemUptimeSeconds}`}</p>
        <Days days={[data[0]]} />
        <Hours hours={[data[1]]} />
        <Mins mins={[data[2]]} />
      </div>
    </React.Fragment>
  )
}
