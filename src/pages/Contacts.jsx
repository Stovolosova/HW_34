import React, { useState, useEffect } from "react";
import './contacts.css';

function Contacts ({ contacts }) {
  const [allContacts, setAllContacts] = useState([]);

  useEffect(() => {
    setAllContacts(contacts);
  }, [contacts]);

  const deleteContact = (id) => {
    const updatedContacts = allContacts.filter(contact => contact.id !== id);
    setAllContacts(updatedContacts);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allContacts.map(contact => (
            <tr  key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => deleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;