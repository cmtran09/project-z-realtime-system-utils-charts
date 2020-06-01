import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

export default function CPUUsage() {
  const [cpuUsageData, setCpuUsageData] = useState('')

  console.log(cpuUsageData)

  useEffect(() => {
    socket.on('cpuPercent', (cpuPercent) => {
      setCpuUsageData(currentData => [...currentData, cpuPercent])
    })
  }, [])

  return (
    <LineChart
      width={500}
      height={300}
      data={cpuUsageData}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line dataKey="value" />
    </LineChart>
  )
}
