import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

export default function RamInfo() {
  const [ramInfo, setRamInfo] = useState({})

  useEffect(() => {
    socket.on('ramInfo', (data) => setRamInfo(data))
  }, [])

  return (
    <div>
      <p>{`totalMemMb:${ramInfo.totalMemMb}Mb`}</p>
      <p>{`usedMemMb:${ramInfo.usedMemMb}Mb`}</p>
      <p>{`freeMemMb:${ramInfo.freeMemMb}Mb`}</p>
      <p>{`freeMemPercentage:${ramInfo.freeMemPercentage}Mb`}</p>
    </div>
  )
}
