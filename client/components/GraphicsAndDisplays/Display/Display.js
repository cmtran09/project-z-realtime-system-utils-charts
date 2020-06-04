import React from 'react'

export default function Display(props) {
  return (
    <div>
      <p>Display Name: {props.displayData.model}</p>
      <p>{`Resolution: ${props.displayData.resolutionx}x${props.displayData.resolutiony}`}</p>
      <p>{`Pixel Depth: ${props.displayData.pixeldepth}`}</p>
      <p>{`Connection Type: ${props.displayData.connection}`}</p>
    </div>
  )
}
