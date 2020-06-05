import React, { useState, useEffect } from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

const initialData = [
  {
    "name": "Battery Capacity",
    "Designed": 0,
    "Max": 0,
    "Current": 0
  }
]

export default function BatteryChart(props) {
  const [batteryChartData, setBatteryChartData] = useState([
    {
      "name": "Battery Capacity",
      "Designed": 0,
      "Max": 0,
      "Current": 0
    }
  ])

  useEffect(() => {
    setBatteryChartData(props.chartData)
  }, [props.chartData])

  return (
    <BarChart
      width={300}
      height={200}
      data={batteryChartData}
      layout="vertical"
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar animationDuration={4500} dataKey="Designed" fill="#8884d8" />
      <Bar animationDuration={4500} dataKey="Max" fill="#82ca9d" />
      <Bar animationDuration={4500} dataKey="Current" fill="#8dd1e1" />
    </BarChart>
  )
}
