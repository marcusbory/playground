import React from 'react'
import { Route, useHistory, useRouteMatch } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'
import './custom.css'

const projects = [
  {
    index: 0,
    id: "dnd",
    title: "dnd",
    desc: "using react-beautiful-dnd with firestore collections. achieving persistent ordering.",
    date: "23/7/21"
  }
]

export default function MyDashboard() {
  const history = useHistory()
  let { path } = useRouteMatch()

  const nav = (url) => {
    history.push(url)
  }

  return (
    <Route path={path}>
      <div className="viewbox">
        <h1 style={{textAlign: "center"}} className="green">hello and welcome</h1>
        <div style={{textAlign: "center"}}>
          playground serves as a location where i demonstrate my crafts. <br />
          this app is hosted on <a href="https://firebase.google.com" target="_blank" rel="noreferrer">google firebase</a>.
        </div>
        <Container style={{marginTop: "32px"}}>
          <h3 className="green mb-3">latest logs</h3>
          {projects.map((project) => (
            <Card onClick={() => nav(`/${project.id}`)} key={project.index} style={{color: "#300a24", borderColor: "rgb(196,160,0)"}} className="mb-2">
              <Card.Header style={{backgroundColor: "#300a24", color: "#eeeeee"}}>
                {project.index}. {project.title}
              </Card.Header>
              <Card.Body>
                {project.desc} (caa {project.date})
              </Card.Body>
            </Card>
          ))}
        </Container>
      </div>
    </Route>
  )
}
