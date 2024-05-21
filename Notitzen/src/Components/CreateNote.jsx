import React, { useState } from 'react';

const CreateNote = ({ inputText, setInputText, saveHandler }) => {
    const char = 100;
    const charLimit = char - inputText.length;
    const [deadline, setDeadline] = useState('');
    const [tags, setTags] = useState('');
    const [priority, setPriority] = useState('Normal');
    const [passwordProtected, setPasswordProtected] = useState(false);
    const [password, setPassword] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            saveHandler(inputText, deadline, tags, priority, passwordProtected ? password : null);
            setInputText('');
            setDeadline('');
            setTags('');
            setPriority('Normal');
            setPasswordProtected(false);
            setPassword('');
        }
    };

    return (
        <div className='note'>
            <textarea
                cols={10}
                rows={5}
                placeholder='Notiz...'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={100}
            />
            <label id='deadline' htmlFor="deadline">Erledigen bis:</label>
            <input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
           
            <label id='priority' htmlFor="priority">Priorität:</label>
            <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="Low">Niedrig</option>
                <option value="Normal">Normal</option>
                <option value="High">Hoch</option>
            </select>
            <label>
                Passwortgeschützt:
                <input id='checkbox'
                    type="checkbox"
                    checked={passwordProtected}
                    onChange={(e) => setPasswordProtected(e.target.checked)}
                />
            </label>
            {passwordProtected && (
                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            )}
            <div className='note_footer'>
                <span className='label'>{charLimit} Zeichen übrig</span>
                <button className='note_save' onClick={() => saveHandler(inputText, deadline, tags, priority, passwordProtected ? password : null)}>Speichern</button>
            </div>
        </div>
    );
};

export default CreateNote;