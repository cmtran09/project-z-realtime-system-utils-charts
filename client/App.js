import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import ReactDOM from 'react-dom'

import './styles/styles.scss'

const App = () => {
  return (
    <p>hello world</p>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)