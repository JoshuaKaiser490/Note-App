import React, { useEffect, useState } from 'react';
import CreateNote from './CreateNote';
import './notes.css';
import { v4 as uuid } from 'uuid';
import Note from './Note';

const Notes = () => {
    const [inputText, setInputText] = useState('');
    const [notes, setNotes] = useState([]);
    const [editToggle, setEditToggle] = useState(null);

    const editHandler = (id, text, deadline) => {
        setEditToggle(id);
        setInputText(text);
    };

    const saveHandler = (text, deadline) => {
        if (editToggle) {
            setNotes(notes.map((note) => (
                note.id === editToggle ? { ...note, text: inputText, deadline } : note
            )));
        } else {
            setNotes((prevNotes) => [
                ...prevNotes,
                {
                    id: uuid(),
                    text: inputText,
                    deadline
                }
            ]);
        }
    };

    const deleteHandler = (id) => {
        const newNotes = notes.filter(n => n.id !== id);
        setNotes(newNotes);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Notes'));
        if (data) {
            setNotes(data);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('Notes', JSON.stringify(notes));
    }, [notes]);

    return (
        <div className='notes'>
            <CreateNote inputText={inputText} setInputText={setInputText} saveHandler={saveHandler} />
            {notes.map((note) => (
                <Note
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    deadline={note.deadline}
                    editHandler={editHandler}
                    deleteHandler={deleteHandler}
                />
            ))}
        </div>
    );
};

export default Notes;
