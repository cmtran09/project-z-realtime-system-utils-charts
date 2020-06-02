import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

export default function CPUUsage() {
  const [cpuUsageData, setCpuUsageData] = useState([])

  // console.log(cpuUsageData)

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
