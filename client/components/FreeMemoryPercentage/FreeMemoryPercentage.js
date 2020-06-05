import React from 'react'
import { useEffect, useState } from 'react'
import { LabelList, RadialBar, Legend, Tooltip, PieChart, Pie, Label, Cell, ResponsiveContainer } from 'recharts'
import io from 'socket.io-client'
// import { Label } from 'semantic-ui-react'

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

export default function FreeMemoryPercentage() {
  const [freeMemoryPercentage, setFreeMemoryPercentage] = useState([])
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    socket.on('freeMemoryPercentage', (data) => {
      setFreeMemoryPercentage(...freeMemoryPercentage, data)
    })
  }, [])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="outside">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  const circleSize = 370

  console.log('freeMemoryPercentage',freeMemoryPercentage)

  return (
    // heloo FreeMemoryPercentage
    // <ResponsiveContainer width={700} height="80%">
    <PieChart
      width={circleSize} height={circleSize/1.7}
    // onMouseEnter={this.onPieEnter}
    >
      {/* <Legend verticalAlign="top" height={36} /> */}
      <Pie

        data={freeMemoryPercentage}
        cx={circleSize/2}
        cy={circleSize/3.7}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={100}
        fill="#8884d8"
      >
        {
          freeMemoryPercentage.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
    </PieChart>
    // </ResponsiveContainer>
  )
}