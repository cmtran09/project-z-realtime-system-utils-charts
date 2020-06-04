import React from 'react'

export default function Graphic(props) {
  return (
    <div>
      hello
      <p>Model: {props.graphicsData.model}</p>
      <p>Vendor: {props.graphicsData.vendor}</p>
      <p>Bus: {props.graphicsData.bus}</p>
      <p>vRAM: {props.graphicsData.vram}</p>
    </div>
  )
}
