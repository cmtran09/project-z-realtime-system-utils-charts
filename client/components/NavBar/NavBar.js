import React from 'react'
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, } from 'semantic-ui-react'

import './NavBar.scss'

export default function NavBar() {
  return (
    <Menu fixed='top' inverted size='massive' className='navbar'>
      <Container>
        <Menu.Item header>
          {/* <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} /> */}
          <div className="navtext">
            <p>
              <i className="microchip icon"></i>
              System Utility Monitor</p>
          </div>
        </Menu.Item>
        {/* <Menu.Item as='a'>Home</Menu.Item> */}
      </Container>
    </Menu>
  )
}
