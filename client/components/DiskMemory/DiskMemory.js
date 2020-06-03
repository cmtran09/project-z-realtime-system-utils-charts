import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

export default function DiskMemory() {
  const [diskInfo, setDiskInfo] = useState({})

  useEffect(() => {
    socket.on('diskInfo', (data) => {
      setDiskInfo(data)
    })
  })

  return (
    <div>
      <p>{`totalGB:${diskInfo.totalGb}`}</p>
      <p>{`usedGb:${diskInfo.usedGb}`}</p>
      <p>{`freeGb:${diskInfo.freeGb}`}</p>
      <p>{`usedPercentage:${diskInfo.usedPercentage}`}</p>
      <p>{`freePercentage:${diskInfo.freePercentage}`}</p>
    </div>
  )
}
