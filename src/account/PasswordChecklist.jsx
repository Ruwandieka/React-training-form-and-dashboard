import React from 'react';

const PasswordChecklist = ({ validation }) => {
    return (
        <div className="password-checklist">
            <div className={`password-checklist-item ${validation.length ? 'valid' : 'invalid'}`}>
                At least 8 characters
            </div>
            <div className={`password-checklist-item ${validation.capital ? 'valid' : 'invalid'}`}>
                At least one capital letter
            </div>
            <div className={`password-checklist-item ${validation.simple ? 'valid' : 'invalid'}`}>
                At least one simple letter
            </div>
            <div className={`password-checklist-item ${validation.number ? 'valid' : 'invalid'}`}>
                At least one number
            </div>
            <div className={`password-checklist-item ${validation.special ? 'valid' : 'invalid'}`}>
                At least one special character
            </div>
        </div>
    );
};

export default PasswordChecklist;
