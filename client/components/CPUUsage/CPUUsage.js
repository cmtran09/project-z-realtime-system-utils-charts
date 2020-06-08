import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

export default function CpuUsage() {
  const [cpuUsageData, setCpuUsageData] = useState([])
  const [cpuTemp, setCpuTemp] = useState({})

  useEffect(() => {
    // Add function to limit the data to 5 mins (5mins * 60 seconds=total number of ticks)
    socket.on('cpuPercent', (cpuPercent) => {
      setCpuUsageData(currentData => [...currentData, cpuPercent])
    })
    socket.on('cpuTemperature', (cpuTemperature) => {
      setCpuTemp(cpuTemperature)
    })
  }, [])

  // console.log('cpuData', cpuData)
  // console.log('cpuTemp', cpuTemp)

  return (
    <ResponsiveContainer width="99%">
      <LineChart
        width={800}
        height={300}
        data={cpuUsageData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tick={{ fill: '#ffbcb6' }} dataKey="name" />
        <YAxis tick={{ fill: '#ffbcb6' }} />
        <Tooltip />
        <Legend />
        <Line dataKey="value" />
      </LineChart>
    </ResponsiveContainer>
  )
}