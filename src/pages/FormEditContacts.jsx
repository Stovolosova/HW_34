import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


function FormEditContacts({ selectedContact, updateContact }) {
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedContact) {
      setEditName(selectedContact.name);
      setEditEmail(selectedContact.email);
      setEditPhone(selectedContact.phone);
    }
  }, [selectedContact]);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedContact = {
      id: selectedContact.id,
      name: editName,
      email: editEmail,
      phone: editPhone,
    };

    updateContact(updatedContact);
    dispatch({ type: 'SET_PAGE', payload: 'contacts' });
  };

  const handleCancel = () => {
    window.location.href = '/contacts';
  };

  return (
    <div style={{ minWidth: '500px' }}>
      <h1>Edit contact</h1>
      {selectedContact && (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default FormEditContacts;