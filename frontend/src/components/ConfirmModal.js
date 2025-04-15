import React from 'react';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="confirm-modal">
        <div className="confirm-content">
          <h3>Confirm Action</h3>
          <p>{message}</p>
          <div className="confirm-actions">
            <button onClick={onCancel} className="cancel-btn">Cancel</button>
            <button onClick={onConfirm} className="confirm-btn">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 