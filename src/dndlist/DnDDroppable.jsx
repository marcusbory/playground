import React, { useEffect, useState, useRef } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { db } from '../firebase'
import DnDDraggable from './DnDDraggable'
import firebase from 'firebase/app'

export default function DnDDroppable() {
  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(false)
  const itemRef = useRef()

  // Get the order from document which stores collection
  useEffect(() => {
    db.collection('projects').doc('dndlist').get().then((doc) => {
      if (doc.exists) {
        setOrder(doc.data().order)
      }
    })
  }, [])

  // React Beautiful DnD frontend persistence
  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const items = Array.from(order)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setOrder(items)
    // Update the order in the document for backend persistence
    db.collection('projects').doc('dndlist').update({
      order: items
    })
  }

  // Adding an item
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Backend update using Firebase SDK
    const addedItem = itemRef.current.value
    let addedId = db.collection('projects').doc('dndlist').collection('items').doc().id
    db.collection('projects').doc('dndlist').update({
      order: firebase.firestore.FieldValue.arrayUnion(addedId)
    })
    db.collection('projects').doc('dndlist').collection('items').doc(addedId).set({ title: addedItem })

    // Frontend update
    setOrder(currentOrder => (
      [...currentOrder, addedId]
    ))

    setLoading(false)
  }

  // Deleting an item
  const handleDelete = (id) => {
    setLoading(true)

    // Backend update using Firebase SDK
    db.collection('projects').doc('dndlist').update({
      order: firebase.firestore.FieldValue.arrayRemove(id)
    })
    db.collection('projects').doc('dndlist').collection('items').doc(id).delete()

    // Frontend update
    setOrder(currentOrder => (
      currentOrder.filter(item => item !== id)
    ))

    setLoading(false)
  }

  return (
    <div className="mt-3">
      <h6 className="green margin-left-1 mb-3">
        user@playground<span style={{color: "#eeeeee"}}>:~$ ./dnd-live-demo</span>
      </h6>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={9}>
            <Form.Group className="mb-3">
              <Form.Control required disabled={order.length >= 20} type="text" maxLength={30} ref={itemRef}
                placeholder={order.length >= 20 ? "list is full" : "add an item (max 20)"}/>
            </Form.Group>
          </Col>
          <Col xs={3}>
            <div style={{textAlign: "right"}}>
              <Button disabled={loading || order.length >= 20} type="submit" className="mb-3 primary-btn">
                + add
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
        
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable" key="dnd">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {order && order.map((itemId, index) => (
                <DnDDraggable key={itemId} id={itemId} index={index} deleteFn={handleDelete}/>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
    
  )
}
