import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ReorderModal = ({ isOpen, onClose, onConfirm }) => {
    const [quantity, setQuantity] = useState(1);

    const handleConfirm = () => {
        const numQuantity = parseInt(quantity, 10);
        if (!isNaN(numQuantity) && numQuantity > 0) {
            onConfirm(numQuantity);
            onClose();
        } else {
            toast.error('Please enter a valid quantity.');
        }
    };

    if (!isOpen) return null;

    return (
        <div style={modalStyle}>
            <div style={modalContentStyle}>
                <h2 style={modalHeaderStyle}>Enter Quantity</h2>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={modalInputStyle}
                />
                <div style={modalButtonContainerStyle}>
                    <button onClick={handleConfirm} style={modalConfirmButtonStyle}>Confirm</button>
                    <button onClick={onClose} style={modalCancelButtonStyle}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

// Modal styling
const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
};

const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const modalHeaderStyle = {
    marginBottom: '15px',
};

const modalInputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const modalButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const modalConfirmButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const modalCancelButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};


export default ReorderModal;
