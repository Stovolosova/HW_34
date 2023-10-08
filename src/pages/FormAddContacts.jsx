import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './formAddContacts.css';
import { useNavigate } from 'react-router-dom';

function FormAddContacts({ addContact }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      name: name,
      email: email,
      phone: phone,
    };
    navigate('/contacts');
    dispatch(addContact(newContact));
  };

  const handleCancel = () => {
    navigate('/contacts');
  };

  return (
    <div style={{ minWidth: '500px' }}>
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
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default FormAddContacts;