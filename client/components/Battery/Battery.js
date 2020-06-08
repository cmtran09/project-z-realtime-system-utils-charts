import React, { useState, useEffect } from 'react'

import io from 'socket.io-client'

import BatteryChart from './BatteryChart/BatteryChart'
import './Battery.scss'

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

export default function Battery() {
  const [batteryData, setBatteryData] = useState('')

  useEffect(() => {
    socket.on('batteryData', (data) => {
      setBatteryData(data)
    })
  }, [])

  return (
    //render only if it has a battery (hasbattery) if not cancel
    <div 
    style={{ width: '100%', height: '150px' }}
    >
      <BatteryChart
        chartData={[{
          "name": batteryData ? `Battery Capacity (${batteryData.capacityUnit})` : '',
          "Designed": batteryData ? batteryData.designedcapacity : 0,
          "Max": batteryData ? batteryData.maxcapacity : 0,
          "Current": batteryData ? batteryData.currentcapacity : 0
        }]}
        capacityUnit={batteryData.capacityUnit}
        />
        <p className='battery-info'>Manufacturer: {batteryData.manufacturer}</p>
        <p className='battery-info'>Serial no: {batteryData.serial}</p>
        <p className='battery-info'>{`Cycle Count: ${batteryData.cyclecount}`}</p>
    </div>
  )
}
