import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/notes';

function NoteItem({ note, setNotes }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(note.text);

  const handleDelete = async () => {
    await axios.delete(`${API_URL}/${note.id}`);
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
  };

  const handleUpdate = async () => {
    const res = await axios.put(`${API_URL}/${note.id}`, { text: newText });
    setNotes((prev) =>
      prev.map((n) => (n.id === note.id ? res.data : n))
    );
    setEditing(false);
  };

  return (
    <li className="note-item">
      {editing ? (
        <>
          <input
            type="text"
            className="edit-input"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <div className="btn-group">
            <button onClick={handleUpdate}>Kaydet</button>
            <button onClick={() => setEditing(false)}>İptal</button>
          </div>
        </>
      ) : (
        <>
          <span className="note-text">{note.text}</span>
          <div className="btn-group">
            <button onClick={() => setEditing(true)}>Düzenle</button>
            <button onClick={handleDelete}>Sil</button>
          </div>
        </>
      )}
    </li>
  );
}

export default NoteItem;
