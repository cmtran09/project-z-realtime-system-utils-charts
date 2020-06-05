import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

import DiskMemoryChart from './DiskMemoryChart/DiskMemoryChart'

const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling']
})

export default function DiskMemory() {
  const [diskInfo, setDiskInfo] = useState({})

  useEffect(() => {
    socket.on('diskInfo', (data) => {
      setDiskInfo(data)
    })
  })

  return (
    <React.Fragment>
      <div>
        <p>{`totalGB:${diskInfo.totalGb}`}</p>
        <p>{`usedGb:${Number(diskInfo.totalGb - diskInfo.freeGb).toFixed(1)}`}</p>
        <p>{`freeGb:${diskInfo.freeGb}`}</p>
        <p>{`usedPercentage:${100 - ((diskInfo.freeGb / diskInfo.totalGb) * 100).toFixed(1)}`}</p>
        <p>{`freePercentage:${((diskInfo.freeGb / diskInfo.totalGb) * 100).toFixed(1)}`}</p>
      </div>
      <DiskMemoryChart diskData={[
        {
          'name': diskInfo ? 'Percentage Used' : '',
          'value': diskInfo.freeGb ? Number(100 - ((diskInfo.freeGb / diskInfo.totalGb) * 100).toFixed(1)) : 0,
        },{
          'name': diskInfo ? 'Percentage Free' : '',
          'value': diskInfo.freeGb ? Number(((diskInfo.freeGb / diskInfo.totalGb) * 100).toFixed(1)) : 0,
        }
      ]} />
    </React.Fragment>
  )
}
