import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

export default function SystemInformation() {
  const [systemData, setSystemData] = useState({})

  useEffect(() => {
    socket.on('systemData', (systemData) => setSystemData(systemData))
  }, [])

  return (
    <div>
      <p>{`Platform: ${systemData.platform}`}</p>
      <p>{`Architecture: ${systemData.architecture}`}</p>
      <p>{`OS Type: ${systemData.osType}`}</p>
      <p>{`Hostname: ${systemData.hostname}`}</p>
    </div>
  )
}
