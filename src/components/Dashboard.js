import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { useAuth} from "../contexts/AuthContext";
import "./App.css";
import Main from "./Main";
import Sidebar from "./Sidebar";
import {  useHistory } from "react-router-dom";
import { db } from "../firebase";
import { GrDocumentNotes } from "react-icons/gr";
import firebase from '../firebase';


 function Dashboard() {
    


const [notes, setNotes] = useState([]);
  useEffect(()=> {
  firebase
 .firestore()
  .collection('notes')
  .onSnapshot(snapshot=> {
    const notes = snapshot.docs.map(doc=> ({
      id: doc.id,
     ... doc.data(),
     lastModified: Date.now(),
     
     
    }))
    
    setNotes(notes)
  })
},[])
 



  
 
 const [activeNote, setActiveNote] = useState(false);
 
 
 

  const onAddNote = () => { 
  
  const newNote = {    
  id: uuid(),
  title:"Type the title here....",
  body: "",
  lastModified: Date.now(),

        
        
        
 
  };
  
  setNotes([newNote,... notes]);
  setActiveNote(newNote.id);
  
  
  firebase
  .firestore()
  .collection("notes")
  .add({
    id: newNote.id,
    title: "type the title here",
    body: "",
    lastModified: Date.now(),

  })
  setNotes([newNote,... notes]);
  setActiveNote(newNote.id);
  
  
  

        //  const onAddNote=() => {
        //  const newNote={
     
        //  id: uuid(),
        //   title: "Type the title here....",
        // body: "",
        //   lastModified: Date.now(),
     
         //};
 
    
  };
  
   const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
    firebase
    .firestore()
    .collection("notes")
    .doc(noteId)
    .delete()
    
  };

  const onUpdateNote = (updatedNote) => {
    
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
        
      }

      return note;
      

    });
    

    setNotes(updatedNotesArr);
    // console.log(updatedNote);
    // firebase
    //   .firestore()
    //   .collection("notes")
    //   .doc(updatedNote.id)
    //   .update({
    //     title:updatedNote.title,
    //     body: updatedNote.body,
    //     lastModified:updatedNote.lastModified,
    //   });
    
  };

  const getActiveNote = () => {
    
    return notes.find(({ id }) => id === activeNote);
  };

  const [ setError] = useState("")
  const { logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  return (
    <div className="Dashboard">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} handleLogout={handleLogout} />
    </div>
  );

  
};



export default Dashboard;
