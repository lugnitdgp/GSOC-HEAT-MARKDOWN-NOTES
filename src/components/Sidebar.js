import React from 'react'
import { FaPlus } from 'react-icons/fa';
import {FiPaperclip} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md';
import {IconContext} from "react-icons";

const Sidebar = ({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
    currentuser,
    setCurrentUser,
  }) => {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  
    return (
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1><b/>NOTES</h1>
          <button onClick={onAddNote}>
            <IconContext.Provider value={{style: {fontSize: '45px'}}}>
            <FaPlus />
            </IconContext.Provider>
            </button>
        </div>
        <div className="app-sidebar-notes">
          {sortedNotes.map(({ id, title, body, lastModified }, i) => (
            <div
              className={`app-sidebar-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
            >
              <div className="sidebar-note-title">
                <IconContext.Provider value={{style:{fontSize:'30px'}}}>
                <FiPaperclip/>  <strong>{title && title.substr(0,20)}</strong>
                </IconContext.Provider>
                <button onClick={(e) => onDeleteNote(id)}>
                  <IconContext.Provider value={{style:{fontSize: '42px'}}}>
                  <MdDelete/>
                  </IconContext.Provider>
                  </button>
              </div>
  
              <p>{body && body.substr(0, 50) + "..."}</p>
              <small className="note-meta">
                Last Modified{" "}
                {new Date(lastModified).toLocaleDateString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  