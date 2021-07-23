import React from 'react'
import { useRouteMatch, Route } from 'react-router-dom'
import Header from '../components/Header'
import '../custom.css'
import DnDDroppable from './DnDDroppable'

const libUsed = [
  {
    id: 0,
    name: "react-beautiful-dnd",
    url: "https://github.com/atlassian/react-beautiful-dnd"
  },
  {
    id: 1,
    name: "firebase sdk",
    url: "https://firebase.google.com/docs/web/setup"
  },
  {
    id: 2,
    name: "react-bootstrap",
    url: "https://react-bootstrap.github.io/"
  },
]

export default function DnDDashboard() {
  let { path } = useRouteMatch()

  return (
    <Route path={path}>
      <div className="viewbox">
        <Header text="dnd" libraries={libUsed} blogpost="https://marcusbory.github.io/posts/dnd-persistent-ordering/"/>
        <DnDDroppable />
      </div>
    </Route>
  )
}
