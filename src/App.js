import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Topnav from './components/Topnav'
import MyDashboard from './MyDashboard'
import DnDDashboard from './dndlist/DnDDashboard'
import BottomNav from './components/BottomNav'

function App() {
  return (<>
    <Container fluid className="app d-flex justify-content-center" style={{minHeight: "100vh"}}>
      <div className="w-100" style={{maxWidth: "500px"}}>
        <Router>
          <Topnav />
          <Switch>
            <Route exact path="/" component={MyDashboard} />
            <Route path="/dnd" component={DnDDashboard} />
          </Switch>
          <BottomNav />
        </Router>
      </div>
    </Container>
  </>)
}

export default App
