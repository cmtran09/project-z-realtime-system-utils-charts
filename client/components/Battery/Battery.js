import React, { useState, useEffect } from 'react'

import io from 'socket.io-client'

import Chart from './Chart/Chart'

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
  console.log('batteryData', batteryData)
  return (
    //render only if it has a battery (hasbattery) if not cancel
    <div>
      <p>Battery Manufacturer: {batteryData.manufacturer}</p>
      <p>Battery Serial: {batteryData.serial}</p>
      <p>{`Max Capacity: ${batteryData.maxcapacity} ${batteryData.capacityUnit}`}</p>
      <p>{`Designed Capacity: ${batteryData.designedcapacity} ${batteryData.capacityUnit}`}</p>
      <p>{`Current Capacity: ${batteryData.currentcapacity} ${batteryData.capacityUnit}`}</p>
      <p>{`Cycle Count: ${batteryData.cyclecount}`}</p>
      <Chart />
    </div>
  )
}
