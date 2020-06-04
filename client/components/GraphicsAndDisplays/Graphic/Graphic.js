import React from 'react'

export default function Graphic(props) {
  return (
    <div>
      <p>Model: {props.graphicData.model}</p>
      <p>Vendor: {props.graphicData.vendor}</p>
      <p>Bus: {props.graphicData.bus}</p>
      <p>vRAM: {props.graphicData.vram}</p>
    </div>
  )
}
