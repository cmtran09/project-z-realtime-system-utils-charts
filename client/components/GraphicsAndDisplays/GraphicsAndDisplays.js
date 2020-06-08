import React, { useState, useEffect } from 'react'
import { Divider } from 'semantic-ui-react'

import io from 'socket.io-client'

const socket = io('http://localhost:5000', {
  transports: ['webscoket', 'polling']
})

import Graphic from './Graphic/Graphic'
import Display from './Display/Display'

export default function GraphicsAndDisplays() {
  const [graphicsAndDisplayData, setGraphicsAndDisplayData] = useState('')

  useEffect(() => {
    let unmounted = false;
    socket.on('graphicsAndDisplays', (data) => {
      if (!unmounted) {
        setGraphicsAndDisplayData(data)
      }
    })
    return () => { unmounted = true };
  }, [])

  return (
    <div>
      <p>Graphics</p>
      {graphicsAndDisplayData && graphicsAndDisplayData.controllers.map((elem, index) => <Graphic key={index} graphicData={elem} />)}
      <Divider section />
      <p>Displays</p>
      {graphicsAndDisplayData && graphicsAndDisplayData.displays.map((elem, index) => <Display key={index} displayData={elem} />)}
    </div>
  )
}
