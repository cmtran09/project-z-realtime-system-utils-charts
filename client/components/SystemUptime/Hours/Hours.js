import React from 'react'
import { RadialBarChart, RadialBar, Legend, Tooltip, PolarAngleAxis } from 'recharts'

export default function Hours(props) {

  return (
    <RadialBarChart
      width={150}
      height={150}
      innerRadius="70%"
      outerRadius="100%"
      data={props.hours}
      startAngle={-270}
      endAngle={90}
    >
      {/* write a funtion to so one revolution is 1hr */}
      <PolarAngleAxis
        type="number"
        domain={[0, 24]}
        angleAxisId={0}
        tick={false}
      />
      <RadialBar animationDuration={400} minAngle={10} label={{ fill: '#666', position: 'insideStart' }} background clockWise={false} dataKey='value' />
      {/* <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" /> */}
      <Tooltip />
      {/* TEXT */}
      <p>hi</p>
    </RadialBarChart>
  )
}
// import React from 'react'
// import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts'

// export default function Hours(props) {

//   return (
//     <RadialBarChart
//       width={150}
//       height={150}
//       innerRadius="70%"
//       outerRadius="100%"
//       data={props.hours}
//       startAngle={360}
//       endAngle={0}
//     >
//       {/* write a funtion to so one revolution is 1hr */}
//       <RadialBar animationDuration={4500} minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='value' />
//       {/* <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" /> */}
//       <Tooltip />
//     </RadialBarChart>
//   )
// }
