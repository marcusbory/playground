import React from 'react'
import { Navbar } from 'react-bootstrap'

export default function BottomNav() {
  return (
    <Navbar fixed="bottom" className="justify-content-center">
      <div style={{textAlign: "center"}} >
        <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> marcusbory 2021 <br />
        <a href="https://marcusbory.github.io">blog</a> || <a href="https://github.com/marcusbory" target="_blank" rel="noreferrer">github</a>
      </div>  
    </Navbar>
  )
}
