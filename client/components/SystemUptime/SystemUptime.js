import React, { useState, useEffect } from 'react'
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts'
import moment from 'moment'
import "moment-duration-format"

import io from 'socket.io-client'

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
      },
      {
        name: 'seconds',
        value: timeArr[3],
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
        <RadialBarChart
          width={730}
          height={250}
          innerRadius="40%"
          outerRadius="100%"
          data={data}
          startAngle={360}
          endAngle={0}
        >
          {/* write a funtion to so one revolution is 1hr */}

          <RadialBar animationDuration={4500} minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='value' />
          <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
          <Tooltip />
        </RadialBarChart>
        <p>{`System Uptime secs:${systemUptime.systemUptimeSeconds}`}</p>
      </div>
    </React.Fragment>
  )
}
