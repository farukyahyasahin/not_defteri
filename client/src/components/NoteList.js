import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, setNotes }) {
  return (
    <ul>
        {notes.map( note => (
            <NoteItem key={note.id} note={note} setNotes={setNotes}/>
        ))}
    </ul>
  );
}

export default NoteList;
