import axios from "axios";
import React, { useState } from "react";

const API_URL = 'http://localhost:5000/notes';

function NoteForm({ setNotes }) {
    const [text, setText] = useState(' ');

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const response = await axios.post(API_URL, { text });
    setNotes((prev) => [...prev, response.data]);
    setText('');
  };

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="Not Girin..."
            value={text}
            onChange={(e) => setText(e.target.value)} 
            />
            <button type="submit">Ekle</button>
        </form>
    );
}

export default NoteForm;