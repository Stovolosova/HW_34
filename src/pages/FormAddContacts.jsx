import React, { useState } from 'react';
import './formAddContacts.css';

function FormAddContacts ({ addContact,  handlePageChange }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const newContact = {
      name: name,
      email: email,
      phone: phone
    };

    addContact(newContact);
    setName('');
    setEmail('');
    setPhone('');

    handlePageChange('contacts'); 
  };

  return (
    <div style={{minWidth: "500px"}}>
      <h1>Add contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => handlePageChange('contacts')}>Cancel</button>
      </form>
    </div>
  );
};

export default FormAddContacts;