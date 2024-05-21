import React, { useState } from 'react';

const Note = ({ id, text, deadline, tags, priority, password, editHandler, deleteHandler }) => {
    const [isUnlocked, setIsUnlocked] = useState(!password);
    const [inputPassword, setInputPassword] = useState('');
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

    const handleUnlock = () => {
        if (inputPassword === password) {
            setIsUnlocked(true);
            setShowPasswordPrompt(false);
        } else {
            alert('Falsches Passwort');
        }
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}.${month}.${year}`;

    };

    const formattedDeadline = deadline ? formatDate(deadline) : null;

    return (
        <div className='note'>
            <div className='note-header'>
                <span className={`priority-${priority.toLowerCase()}`}>{priority}</span>
                {password && (
                    <span className='lock-icon' onClick={() => setShowPasswordPrompt(!showPasswordPrompt)}>
                        {isUnlocked ? '🔓' : '🔒'}
                    </span>
                )}
            </div>
            <div className='note-body'>
                {isUnlocked ? text : 'Inhalt gesperrt'}
            </div>
            {showPasswordPrompt && (
                <div className='password-prompt'>
                    <input
                        type='password'
                        placeholder='Passwort eingeben'
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                    />
                    <button onClick={handleUnlock}>Freischalten</button>
                </div>
            )}
            <div className='note-footer'>
                <button className='note_save' onClick={() => deleteHandler(id)}>
                    Löschen
                </button>
                <button className='note_save' onClick={() => editHandler(id, text, deadline, tags, priority)}>
                    Bearbeiten
                </button> <br />
                {formattedDeadline && <span className='deadline'>Frist: {formattedDeadline}</span>}
                
            </div>
        </div>
    );
};

export default Note;

