import React from 'react'
import { RadialBarChart, RadialBar, Legend, Tooltip, PolarAngleAxis } from 'recharts'

export default function Days(props) {

  return (
    <RadialBarChart
      width={150}
      height={150}
      innerRadius="70%"
      outerRadius="100%"
      data={props.days}
      startAngle={360*2}
      endAngle={0}
    >
      {/* write a funtion to so one revolution is 1hr */}
      <PolarAngleAxis
        type="number"
        domain={[0, 7]}
        angleAxisId={0}
        tick={false}
      />
      <RadialBar animationDuration={4500} minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='value' />
      {/* <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" /> */}
      <Tooltip />
    </RadialBarChart>
  )
}
