import React from 'react';

const Note = ({ id, text, deadline, editHandler, deleteHandler }) => {
    return (
        <div className='note'>
            <div className='note-body'>{text}</div>
            <div className='note-footer' style={{ justifyContent: 'flex-end' }}>
                {deadline && <span className='deadline'>Frist: {deadline}</span>}
                <button className='note_save' onClick={() => deleteHandler(id)}>
                    Löschen
                </button>{' '}
                &nbsp;
                <button className='note_save' onClick={() => editHandler(id, text, deadline)}>
                    Bearbeiten
                </button>
            </div>
        </div>
    );
};

export default Note;
