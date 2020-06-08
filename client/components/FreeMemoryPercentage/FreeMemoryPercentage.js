import React from 'react'
import { useEffect, useState } from 'react'
import { LabelList, RadialBar, Legend, Sector, Tooltip, PieChart, Pie, Label, Cell, ResponsiveContainer } from 'recharts'
import io from 'socket.io-client'

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle"
        fill={'#ffbcb6'}>{payload.name === 'usedMemoryPercentage' ? 'Used RAM' : 'Free RAM'}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={'#ff8373'}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={'#ff8373'}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={'#ff8373'} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={'#ff8373'} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#ffbcb6">{`${value}%`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#ffbcb6">
        {`${payload.used || payload.free}Mb`}
      </text>
    </g>
  )
}

export default function FreeMemoryPercentage() {
  const [freeMemoryPercentage, setFreeMemoryPercentage] = useState([])
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    socket.on('freeMemoryPercentage', (data) => {
      setFreeMemoryPercentage(...freeMemoryPercentage, data)
    })
  }, [])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (data, index) => {
    setActiveIndex(index)
  }

  const circleSize = 370

  console.log('freeMemoryPercentage', freeMemoryPercentage)

  return (
    <ResponsiveContainer width='99%'>
      <PieChart width={circleSize} height={circleSize / 1.9}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={freeMemoryPercentage}
          cx={circleSize / 2}
          cy={circleSize / 3.7}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}