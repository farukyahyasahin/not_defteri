import React,{useState , useEffect} from "react";
import axios from "axios";
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

const API_URL = 'http://localhost:5000/notes';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setNotes(res.data));
  }, []);

  return(
    <div className="container">
      <h1>Not Defteri</h1>
      <NoteForm setNotes={setNotes} />
      <NoteList notes={notes} setNotes={setNotes}/>
    </div>
  );
}

export default App;