import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "lv": 1400
  }
]

export default function Chart(props) {
  return (
    <BarChart
      width={300}
      height={200}
      data={data}
      layout="vertical"
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
      <Bar dataKey="lv" fill="#8dd1e1" />
    </BarChart>
  )
}
