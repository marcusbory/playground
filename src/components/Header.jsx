import React from 'react'

export default function Header({ text="default", libraries=[], blogpost="", notes="" }) {
  return (
    <div>
      <h3 className="margin-left-1">{text}</h3>
      <hr />
      <div className="margin-left-1">
        libraries: [
        {libraries && libraries.map((library, index) => (
          <span key={library.id}>
            <a href={library.url} target="_blank" rel="noreferrer">{library.name}</a>
            {libraries.length !== (index+1) && <span>, </span>}
          </span>
        ))}
        ]
      </div>
      <div className="margin-left-1">
        blog post: {blogpost ? <a href={blogpost}>{blogpost}</a> : <i>null</i>} <br />
        notes: {notes ? notes : <i>null</i>}
      </div>
    </div>
  )
}
