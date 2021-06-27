import React from 'react'
import { FaPlus } from 'react-icons/fa';
import {FiPaperclip} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md';
import {IconContext} from "react-icons";
import {FaBars} from "react-icons/fa";
import {MdCancel} from "react-icons/md";

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
      <div className="sidebar">
     <input type="checkbox" id="check" />
     <label for="check">
     <FaBars id="btn"/>
     <MdCancel id="cancel"/>
     </label>
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
                <FiPaperclip/>  <strong>{title && title.substr(0,15)}</strong>
                </IconContext.Provider>
                <button onClick={(e) => onDeleteNote(id)}>
                  <IconContext.Provider value={{style:{fontSize: '38px'}}}>
                  <MdDelete/>
                  </IconContext.Provider>
                  </button>
              </div>
  
              <p>{body && body.substr(0, 10) + "..."}</p>
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
      </div>
    );
  };
  
  export default Sidebar;
  