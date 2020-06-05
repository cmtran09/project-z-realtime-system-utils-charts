import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const initialDiskData = [
  {
    'name': 'Percentage Used',
    'value': 0,
  }, {
    'name': 'Percentage Free',
    'value': 0,
  }
]
export default function DiskMemoryChart(props) {
  const [diskMemoryData, setDiskMemoryData] = useState(initialDiskData)
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

  // const circleSize = 370

  console.log(diskMemoryData)

  useEffect(() => {
    setDiskMemoryData(props.diskData)
  }, [props.diskData])

  return (
    <div>
      DiskMemoryChart.js
      <PieChart
        width={200} height={200}
      >
        <Pie
          data={diskMemoryData}
          cx={200 / 2}
          cy={200 / 2}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
        >
          {
            diskMemoryData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    </div>
  )
}
