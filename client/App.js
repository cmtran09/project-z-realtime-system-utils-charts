import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import ReactDOM from 'react-dom'

import './styles/styles.scss'
import NavBar from './components/NavBar/NavBar'

const App = () => {
  return (
    <React.Fragment>
      <div className="background">
        <NavBar />
        {/* <img src="/assets/images/bg-blue-large.png" alt="" /> */}
        <p>hello world</p>
      </div>
    </React.Fragment>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)