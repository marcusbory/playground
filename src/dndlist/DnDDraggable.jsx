import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'
import { db } from '../firebase'

export default function DnDDraggable({ id, index, deleteFn }) {
  const [item, setItem] = useState("")

  // Get name of item from Firestore collection
  useEffect(() => {
    db.collection('projects').doc('dndlist').collection('items').doc(id).get().then((doc) => {
      if (doc.exists) {
        setItem(doc.data().title)
      }
    })
  }, [id])

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Card className={snapshot.isDragging ? "mb-2 dragging" : "mb-2 not-drag"}
          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Card.Body>
            {item}
            <div style={{float: "right"}} onClick={() => deleteFn(id)}>
              x
            </div>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  )
}
