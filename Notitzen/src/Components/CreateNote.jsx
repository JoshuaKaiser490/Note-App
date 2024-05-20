import React, { useState } from 'react';

const CreateNote = ({ inputText, setInputText, saveHandler }) => {
    const char = 100;
    const charLimit = char - inputText.length;
    const [deadline, setDeadline] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            saveHandler(inputText, deadline);
            setInputText('');
            setDeadline('');
        }
    };

    return (
        <div className='note'>
            <textarea
                cols={10}
                rows={5}
                placeholder='Notitz...'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={100}
            />
            <label className='deadline_Text' htmlFor="deadline">Erledigen bis:</label>
            <input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <div className='note_footer'>
                <span className='label'>{charLimit} Zeichen übrig</span>
                <button className='note_save' onClick={() => saveHandler(inputText, deadline)}>Speichern</button>
            </div>
        </div>
    );
};

export default CreateNote;
