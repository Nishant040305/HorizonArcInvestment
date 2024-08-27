import React from 'react';
import './ConfirmPopup.css';

const ConfirmPopup = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <h3>Unfriend User</h3>
                <p>Are you sure you want to unfriend this user and delete all chats?</p>
                <div className="popup-actions">
                    <button className="confirm-button bg-red-500" onClick={onConfirm}>Yes</button>
                    <button className="cancel-button bg-gray-500" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;
