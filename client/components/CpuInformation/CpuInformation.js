import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

import './CpuInformation.scss'

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

export default function CpuInformation() {
  const [cpuData, setCpuData] = useState({})

  useEffect(() => {
    let unmounted = false;
    socket.on('cpuInformation', (cpuInformation) => {
      if (!unmounted) {
      setCpuData(cpuInformation)
      }
    })
    return () => { unmounted = true };
  }, [])

  return (
    <div>
      <p id='cpu-title'>Cpu Usage</p>
      <p className='cpu-data-text'>Manufacturer: {cpuData.manufacturer}</p>
      <p className='cpu-data-text'>Brand: {cpuData.brand}</p>
      <p className='cpu-data-text'>{`Speed: ${cpuData.speed}GHz`}</p>
      <p className='cpu-data-text'>Max Speed: {cpuData.speedmax}</p>
      <p className='cpu-data-text'>Min Speed: {cpuData.speedmin}</p>
      <p className='cpu-data-text'>Number of Cores: {cpuData.cores}</p>
      <p className='cpu-data-text'>Physical Cores: {cpuData.physicalCores}</p>
    </div>
  )
}
