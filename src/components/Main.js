import React from "react";
import { FaBars, FaPenAlt } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { GrLogout} from 'react-icons/gr';
import ImageUpload from "./ImageUpload";






import ReactMarkdown from "react-markdown";




const Main = ({ activeNote, onUpdateNote, handleLogout }) => {
  
  const onEditField = (field, value) => {
    onUpdateNote({
     
     
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
   
  };

  if (!activeNote) return <div className="no-active-note">
    No Active Note
    
    </div>;

  


  return (
    // <div className="app">
    //    <input type="checkbox" id="check" />
    //     <label for="check">
    //     <FaBars id="btn"/>
    //     </label>
    <div className="app-main">
    {/* <input type="checkbox" id="check" />
    <label for="check">
    <FaBars id="btn"/>
    </label> */}
      <div className="app-main-header">
      <input type="checkbox" id="check" />
        <label for="check">
        <FaBars id="btn"/>
        </label>
      <h1>
        <IconContext.Provider value={{style:{fontSize:'30px', border:'5px'}}}>
        {/* <input type="checkbox" id="check" />
        <label for="check">
        <FaBars id="btn"/>
        </label> */}
       <FaPenAlt/> Edit Section
        </IconContext.Provider>  
      
      </h1>
      <button onClick={handleLogout}>
        <IconContext.Provider value={{style:{fontSize:'40px',color: 'Black'}}}><GrLogout/></IconContext.Provider>
        </button>
      </div>
      <div className="wrapper">
      <div className="app-main-note-edit">
        
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}>
          </textarea>
          <ImageUpload/>
          
          
         
          
          
      </div>
      <div className="app-main-note-preview">
        
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
      </div>
    </div>
    // </div>
  );
};

export default Main;
