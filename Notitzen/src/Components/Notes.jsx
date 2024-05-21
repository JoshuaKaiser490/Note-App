import React, { useState, useEffect } from 'react';
import CreateNote from './CreateNote';
import './notes.css';
import { v4 as uuid } from 'uuid';
import Note from './Note';

const Notes = () => {
    const [inputText, setInputText] = useState("");
    const [notes, setNotes] = useState([]);
    const [editToggle, setEditToggle] = useState(null);
    const [deadline, setDeadline] = useState('');
    const [tags, setTags] = useState('');
    const [priority, setPriority] = useState('Normal');
    const [password, setPassword] = useState('');

    const editHandler = (id, text, deadline, tags, priority, password) => {
        setEditToggle(id);
        setInputText(text);
        setDeadline(deadline);
        setTags(tags);
        setPriority(priority);
        setPassword(password);
    };

    const saveHandler = (text, deadline, tags, priority, password) => {
        if (editToggle) {
            setNotes(notes.map((note) => (
                note.id === editToggle ? { ...note, text, deadline, tags, priority, password } : note
            )));
            setEditToggle(null);
        } else {
            setNotes((prevNotes) => [
                { id: uuid(), text, deadline, tags, priority, password },
                ...prevNotes,
            ]);
        }
        setInputText("");
        setDeadline('');
        setTags('');
        setPriority('Normal');
        setPassword('');
    };

    const deleteHandler = (id) => {
        const newNotes = notes.filter(n => n.id !== id);
        setNotes(newNotes);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        if (data) {
            setNotes(data);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("Notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <div className='notes'>
            <CreateNote
                inputText={inputText}
                setInputText={setInputText}
                saveHandler={saveHandler}
            />
            {
                notes.map((note) => (
                    <Note
                        key={note.id}
                        id={note.id}
                        text={note.text}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                        deadline={note.deadline}
                        tags={note.tags}
                        priority={note.priority}
                        password={note.password}
                    />
                ))
            }
        </div>
    );
};

export default Notes;
