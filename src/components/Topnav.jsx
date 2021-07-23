import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useHistory, Route, useRouteMatch } from 'react-router-dom'
import '../custom.css'

const navbarTheme = {
  backgroundColor: "rgb(200, 201, 202)",
}

export default function Topnav() {
  const history = useHistory()
  let { path } = useRouteMatch()
  const nav = (url) => {
    history.push(url)
  }

  return (
    <Route path={path}>
      <Navbar fixed="top" style={navbarTheme} className="navbar">
        <Navbar.Brand onClick={() => nav("/")} className="brand">playground</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="justify-content-end margin-right-2 mt-2 mb-2"/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end margin-right-2 mt-2 mb-2">
          <Nav className="me-auto">
            <NavDropdown title="toys" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => nav("/dnd")}>dnd</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item disabled>more to come</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Route>
  )
}
