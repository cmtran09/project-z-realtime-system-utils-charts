import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

export default function CpuInformation() {
  const [cpuData, setCpuData] = useState({})

  useEffect(() => {
    socket.on('cpuInformation', (cpuInformation) => {
      setCpuData(cpuInformation)
    })
  }, [])

  return (
    <div>
      <p>Manufacturer: {cpuData.manufacturer}</p>
      <p>Brand: {cpuData.brand}</p>
      <p>{`Speed: ${cpuData.speed}GHz`}</p>
      <p>Max Speed: {cpuData.speedmax}</p>
      <p>Min Speed: {cpuData.speedmin}</p>
      <p>Number of Cores: {cpuData.cores}</p>
      <p>Physical Cores: {cpuData.physicalCores}</p>
    </div>
  )
}
