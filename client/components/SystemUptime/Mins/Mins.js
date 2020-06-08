import React from 'react'
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip, PolarAngleAxis } from 'recharts'

export default function Mins(props) {

  return (
    <ResponsiveContainer width="99%">
      <RadialBarChart
        width={125}
        height={125}
        innerRadius="70%"
        outerRadius="100%"
        data={props.mins}
        startAngle={360}
        endAngle={0}
        fill='#ff8373'
      >
        {/* write a funtion to so one revolution is 1hr */}
        <PolarAngleAxis
          type="number"
          domain={[0, 60]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          animationDuration={4500}
          minAngle={15}
          label={{ fill: '#666', position: 'insideStart' }}
          background clockWise={true}
          dataKey='value' />
        {/* <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" /> */}
        <text
          x={125 / 2}
          y={125 / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="progress-label"
        >
          {`${props.mins[0].value} Mins`}
        </text>
        <Tooltip />
      </RadialBarChart>
    </ResponsiveContainer>
  )
}
