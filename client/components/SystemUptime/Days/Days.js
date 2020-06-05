import React from 'react'
import { RadialBarChart, RadialBar, Legend, Tooltip, PolarAngleAxis } from 'recharts'

export default function Days(props) {
  return (
    <RadialBarChart
      width={125}
      height={125}
      innerRadius="70%"
      outerRadius="100%"
      data={props.days}
      startAngle={360}
      endAngle={0}
    >
      {/* write a funtion to so one revolution is 1hr */}
      <PolarAngleAxis
        type="number"
        domain={[0, 14]}
        angleAxisId={0}
        tick={false}
      />
      <RadialBar
        animationDuration={5000}
        minAngle={1}
        label={{ fill: '#666', position: 'insideStart' }}
        background
        clockWise={true}
        dataKey='value' />
      {/* <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" /> */}
      <text
        x={125 / 2}
        y={125 / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="progress-label"
      >
        {`${props.days[0].value} Days`}
      </text>
      <Tooltip />
    </RadialBarChart>
  )
}
