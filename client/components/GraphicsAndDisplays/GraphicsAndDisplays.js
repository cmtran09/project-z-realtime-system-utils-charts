import React, { useState, useEffect } from 'react'

import io from 'socket.io-client'

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

import Graphic from './Graphic/Graphic'
import Display from './Display/Display'

export default function GraphicsAndDisplays() {
  const [graphicsAndDisplayData, setGraphicsAndDisplayData] = useState('')

  useEffect(() => {
    let unmounted = false
    socket.on('graphicsAndDisplays', (data) => {
      setGraphicsAndDisplayData(data)
    })
    return () => {
      unmounted = true
    }
  }, [])

  console.log('graphicsAndDisplayData', graphicsAndDisplayData)

  return (
    <div>
      {graphicsAndDisplayData && graphicsAndDisplayData.controllers.map((elem, index) => <Graphic key={index} graphicData={elem} />)}
      {/* {graphicsAndDisplayData.displays && graphicsAndDisplayData.displays.map((elem, index) => <Display key={index} displayData={elem} />)} */}
    </div>
  )
}
