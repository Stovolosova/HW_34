import React, { useState } from 'react';

function FormEditContacts({ contact, updateContact, handlePageChange }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedContact = {
      id: contact.id,
      name: name,
      email: email,
      phone: phone,
    };

    updateContact(updatedContact);
    handlePageChange('contacts');
  };
  

  return (
    <div style={{ minWidth: '500px' }}>
      <h1>Edit contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <button type="submit" >ADD</button>
        <button type="button" onClick={() => handlePageChange('contacts')}>
        Back
        </button>
      </form>
    </div>
  );
}

export default FormEditContacts;

