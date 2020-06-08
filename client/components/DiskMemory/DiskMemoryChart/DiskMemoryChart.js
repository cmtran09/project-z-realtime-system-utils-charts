import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

import './DiskMemoryChart.scss'

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
      <text className='pie-label' x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="outside">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  const circleSize = 370

  console.log('diskMemoryData', diskMemoryData)

  useEffect(() => {
    setDiskMemoryData(props.diskData)
  }, [props.diskData])

  return (
    <div>
      <PieChart
        width={circleSize} height={circleSize / 1.7}
      >
        <Pie
          data={diskMemoryData}
          cx={circleSize / 2}
          cy={circleSize / 3.7}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={75}
          fill="#8884d8"
        >
          {
            diskMemoryData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Legend verticalAlign="bottom" height={36} wrapperStyle={{ padding: 20 }} />
      </PieChart>
    </div>
  )
}
